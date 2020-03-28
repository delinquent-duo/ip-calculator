import { SubnetMask } from './SubnetMask';

export class Host {
  readonly exponent: number;
  readonly required: number;
  readonly available: number;
  readonly subnetMask: SubnetMask;

  constructor(size: number) {
    let exponent = 1;
    while (2 ** exponent < size + 2) exponent++;

    this.exponent = exponent;
    this.required = size;
    this.available = 2 ** exponent - 2;
    this.subnetMask = new SubnetMask(32 - exponent);
  }
}
