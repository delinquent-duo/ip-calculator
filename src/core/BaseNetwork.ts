import { Address4 } from 'ip-address';
import { IPv4 } from './types';
import { createIPv4, calculateIp, calculateCapacity } from './helpers';

export abstract class BaseNetwork {
  readonly ip: Address4;
  readonly capacity: number;

  constructor(address: IPv4) {
    this.ip = createIPv4(address);
    this.capacity = calculateCapacity(this.ip.subnetMask);
  }

  // methods
  public first(): Address4 {
    return this.nth(1);
  }

  public last(): Address4 {
    return this.nth(this.capacity);
  }

  public broadcast(): Address4 {
    return this.nth(this.capacity + 1);
  }

  nth(nth: number): Address4 {
    nth = Math.round(nth);

    if (this.capacity + 2 <= nth) {
      throw new Error(
        `nth (${nth}) host exceeds networks available hosts (${this.capacity}).`
      );
    } else if (nth < 0) {
      throw new Error(`nth (${nth}) cannot be negative.`);
    }

    return calculateIp(this.ip, nth);
  }
}
