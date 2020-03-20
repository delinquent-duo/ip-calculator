import { IPv4 } from './types';
import { Host } from './Host';
import { Subnetwork } from './Subnetwork';
import { BaseNetwork } from './BaseNetwork';
import { calculateIp, verifyHosts } from './helpers';

export class Network extends BaseNetwork {
  readonly subnetworks: Subnetwork[];

  constructor(address: IPv4) {
    super(address);
    this.subnetworks = [];
  }

  vlsm(...hosts: number[]): Subnetwork[] {
    return this.initSubnetwork(...hosts);
  }

  private initSubnetwork(...hosts: number[]): Subnetwork[] {
    verifyHosts(hosts, this.capacity);
    hosts = hosts.sort((a, b) => b - a);

    const { subnetworks: sn } = this;
    // clear subnetworks
    sn.splice(0, sn.length);

    hosts.forEach((hostSize: number, index: number) => {
      const host: Host = new Host(hostSize);
      if (host.required === 0) return;

      const prevSubnetwork: Subnetwork | null = sn.length
        ? sn[index - 1]
        : null;

      const address = prevSubnetwork
        ? calculateIp(prevSubnetwork.ip, prevSubnetwork.host.available + 2)
        : this.ip;

      sn.push(new Subnetwork(index, address, host));
    });

    return sn;
  }
}
