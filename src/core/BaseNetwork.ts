import { Address4 } from 'ip-address';
import { IPv4 } from './types';
import { createIPv4, calculateCapacity } from './helpers';

export abstract class BaseNetwork {
  readonly ip: Address4;
  readonly capacity: number;

  constructor(address: IPv4) {
    this.ip = createIPv4(address);
    this.capacity = calculateCapacity(this.ip.subnetMask);
  }
}
