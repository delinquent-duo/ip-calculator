import { Address4 } from 'ip-address';
import { Host } from './Host';
import { IPv4, THost } from './types';
import { BaseNetwork } from './BaseNetwork';
import { createHost, createIPv4 } from './helpers';

export class Subnetwork extends BaseNetwork {
  readonly id: number;
  readonly host: Host;

  constructor(id: number, address: IPv4, host: THost) {
    // convert address to string
    if (address instanceof Address4) {
      address = address.parsedAddress.join('.');
    }

    const mHost = createHost(host);
    const ip = createIPv4(address, mHost.subnetMask.value);
    super(ip);
    this.id = id;
    this.host = mHost;
  }
}
