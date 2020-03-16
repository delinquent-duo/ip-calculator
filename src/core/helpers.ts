import { Address4 } from 'ip-address';
import { Host } from './Host';
import { IPv4, THost } from './types';

export function createIPv4(address: IPv4): Address4 {
  const ip =
    address instanceof Address4
      ? address
      : new Address4(address.replace(/\s/g, ''));

  if (!ip.valid) {
    throw new Error((ip as any).error);
  }

  return ip;
}

export function createHost(host: THost): Host {
  return host instanceof Host ? host : new Host(host);
}

export function calculateCapacity(subnetMask: number) {
  return Math.pow(256, 4 - subnetMask / 8) - 2;
}

export function verifyHosts(hosts: number[], capacity: number): boolean {
  const total: number = hosts.reduce(
    (total, host) => total + (host > 0 ? host + 2 : 0),
    0
  );

  if (total - 2 > capacity) {
    throw new Error('Number of hosts exceeds network capacity.');
  }

  return true;
}
