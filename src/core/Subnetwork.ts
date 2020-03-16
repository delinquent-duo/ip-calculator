import { Host } from './Host';
import { Network } from './Network';
import { IPv4, THost } from './types';
import { createHost } from './helpers';

export class Subnetwork extends Network {
  readonly id: number;
  readonly host: Host;

  protected constructor(id: number, address: IPv4, host: THost) {
    super(address);
    this.id = id;
    this.host = createHost(host);
  }
}
