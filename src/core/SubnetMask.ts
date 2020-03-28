import { Address4 } from 'ip-address';
import { convertSubnetMaskToIp } from './helpers';

export class SubnetMask {
  readonly ip: Address4;
  readonly subnetMask: number;

  constructor(subnetMask: number) {
    this.subnetMask = subnetMask;
    this.ip = convertSubnetMaskToIp(subnetMask);
  }
}
