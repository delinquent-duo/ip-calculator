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

export function isIpNumInvalid(num: number) {
  return num >= 256 || num < 0;
}

export function calculateIp(address: IPv4, n: number): Address4 {
  const ip: Address4 = createIPv4(address);
  const newIp: number[] = ip.parsedAddress.map(n => +n);

  // add to host
  newIp[3] += Math.round(n);

  do {
    // add/subtract 256 to current, add/subtract 1 to previous
    // until everything is valid and within 0 <= n < 256
    for (let i = 3; i > 0; i--) {
      const mult = newIp[i] >= 256 ? -1 : newIp[i] < 0 ? 1 : 0;
      newIp[i] += mult * 256;
      newIp[i - 1] -= mult;
    }
  } while (
    // if a number is invalid, continue do while loop
    newIp.some(isIpNumInvalid) &&
    !isIpNumInvalid(newIp[0])
  );

  // try to create ip
  const newIpValue: string = newIp.join('.');
  try {
    return createIPv4(newIpValue);
  } catch (_) {
    throw new Error(
      `Resulting IP address is an invalid IP address: ${newIpValue}`
    );
  }
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
