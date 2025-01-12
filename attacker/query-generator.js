import { faker } from '@faker-js/faker';

// Generate a random domain name
export const generateRandomDomain = () => faker.internet.domainName();

// Create a DNS query buffer for the given domain
export const createDNSQuery = (domain) => {
  const query = Buffer.alloc(32);
  query.writeUInt16BE(0x1234, 0); // Transaction ID
  query.writeUInt16BE(0x0100, 2); // Standard query flags
  query.writeUInt16BE(1, 4);      // Questions count
  query.writeUInt16BE(0, 6);      // Answer RRs
  query.writeUInt16BE(0, 8);      // Authority RRs
  query.writeUInt16BE(0, 10);     // Additional RRs
  const labels = domain.split('.');
  let offset = 12;
  labels.forEach((label) => {
    query.writeUInt8(label.length, offset++);
    query.write(label, offset, 'ascii');
    offset += label.length;
  });
  query.writeUInt8(0, offset++); // End of QNAME
  query.writeUInt16BE(0x0001, offset); // QTYPE A
  query.writeUInt16BE(0x0001, offset + 2); // QCLASS IN
  return query;
};
