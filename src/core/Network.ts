import { Address4 } from 'ip-address';
import { Subnetwork } from './Subnetwork';

export class Network {
  readonly ip: Address4;
  readonly capacity: number;
  readonly subnetworks: Subnetwork[];

  constructor(address: string) {
    this.ip = new Address4(address.replace(/\s/g, ''));
    this.capacity = 0;
    this.subnetworks = [];

    if (!this.ip.valid) {
      const error: string | undefined = (this.ip as any).error;
      if (error) {
        throw new Error(error);
      }
      return;
    }

    this.capacity = Network.calculateCapacity(this.ip.subnetMask);
  }

  // TODO: update

  // class

  static calculateCapacity(subnetMask: number) {
    return Math.pow(256, 4 - subnetMask / 8) - 2;
  }
}
