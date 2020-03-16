import { Address4 } from 'ip-address';
import { IPv4 } from './types';
import { Subnetwork } from './Subnetwork';
import { calculateCapacity, createIPv4, verifyHosts } from './helpers';

export class Network {
  readonly ip: Address4;
  readonly capacity: number;
  readonly subnetworks: Subnetwork[];

  constructor(address: IPv4) {
    this.subnetworks = [];
    this.ip = createIPv4(address);
    this.capacity = calculateCapacity(this.ip.subnetMask);
  }

  vlsm(...hosts: number[]) {
    return this.initSubnetwork(...hosts);
  }

  private initSubnetwork(...hosts: number[]) {
    verifyHosts(hosts, this.capacity);
    hosts = hosts.sort((a, b) => b - a);

    // clear subnetworks
    this.subnetworks.splice(0, this.subnetworks.length);

    // TODO: each hosts is 1 subnetwork
  }
}
