import { Address4 } from 'ip-address';
import { Host } from './Host';
import { IPv4, THost } from './types';

export function createIPv4(address: IPv4, subnetMask = 32): Address4 {
  if (typeof address === 'string') {
    address = address.replace(/\s/g, '');
    // add subnet mask if no subnet mask
    if (!address.split('/')[1]) {
      address = address.concat(`/${subnetMask}`);
    }
    address = new Address4(address);
  }

  const ip: Address4 = address;
  if (!ip.valid) {
    throw new Error((ip as any).error);
  }

  return ip;
}

export function createHost(host: THost): Host {
  return host instanceof Host ? host : new Host(host);
}

export function calculateCapacity(subnetMask: number) {
  return 256 ** (4 - subnetMask / 8) - 2;
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
    return createIPv4(newIpValue, ip.subnetMask);
  } catch (_) {
    throw new Error(
      `Resulting IP address is an invalid IP address: ${newIpValue}`
    );
  }
}

export function createFilledBinary(fill: number, length = 8): string {
  if (fill > length || fill < 0) {
    throw new Error(`Invalid fill value: ${fill}`);
  }

  const bin: number[] = new Array<number>(fill).fill(1);
  while (bin.length < length) bin.push(0);
  return bin.join('');
}

export function convertSubnetMaskToIp(subnetMask: number | string): Address4 {
  if (typeof subnetMask === 'string') {
    const mask: string | undefined = subnetMask.trim().split('/')[1];
    subnetMask = parseInt(mask);
  }

  if (isNaN(subnetMask)) {
    throw new Error('Invalid subnet mask.');
  }

  // divide mask by 8s
  const res: number[] = [];
  for (let divided = subnetMask / 8; res.length < 4; divided--) {
    const multiplier = Math.max(0, divided - 1 < 0 ? divided : 1);
    res.push(8 * multiplier);
  }

  const parsedSubnetMask: number[] = res.map((ipNum: number) =>
    parseInt(createFilledBinary(ipNum), 2)
  );
  const ipSubnetMask = parsedSubnetMask.join('.');
  return createIPv4(ipSubnetMask, 0);
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
