import { Address4 } from 'ip-address';
import { convertSubnetMaskToIp } from './helpers';

export class SubnetMask {
  readonly ip: Address4;
  readonly value: number;

  constructor(subnetMask: number | string) {
    const [ip, mask] = convertSubnetMaskToIp(subnetMask);
    this.ip = ip;
    this.value = mask;
  }
}
