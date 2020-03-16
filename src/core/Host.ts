export class Host {
  readonly exponent: number;
  readonly subnetMask: number;
  readonly required: number;
  readonly available: number;

  constructor(size: number) {
    let exponent = 1;
    while (2 ** exponent < size + 2) exponent++;

    this.exponent = exponent;
    this.subnetMask = 32 - exponent;
    this.required = size;
    this.available = 2 ** exponent - 2;
  }
}
