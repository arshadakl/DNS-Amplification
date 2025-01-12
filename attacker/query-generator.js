import { faker } from '@faker-js/faker';

// Generate a random domain name
export const generateRandomDomain = () => faker.internet.domainName();

export const createDNSQuery = (domain) => {
    // Calculate the buffer size dynamically based on the domain length
    const domainParts = domain.split('.');
    let domainLength = 0;
  
    domainParts.forEach(part => {
      domainLength += part.length + 1; // Length of each label + length byte
    });
  
    const bufferLength = 12 + domainLength + 5; // Header (12 bytes) + QNAME + QTYPE (2 bytes) + QCLASS (2 bytes)
    const query = Buffer.alloc(bufferLength);
  
    // Write the DNS header
    query.writeUInt16BE(0x1234, 0); // Transaction ID
    query.writeUInt16BE(0x0100, 2); // Flags (standard query)
    query.writeUInt16BE(1, 4); // Questions count
    query.writeUInt16BE(0, 6); // Answer RRs
    query.writeUInt16BE(0, 8); // Authority RRs
    query.writeUInt16BE(0, 10); // Additional RRs
  
    // Write the QNAME (domain name in DNS format)
    let offset = 12; // Start after the header
    domainParts.forEach(part => {
      query.writeUInt8(part.length, offset++); // Label length
      query.write(part, offset, 'ascii'); // Label
      offset += part.length;
    });
    query.writeUInt8(0, offset++); // End of QNAME
  
    // Write the QTYPE and QCLASS
    query.writeUInt16BE(0x0001, offset); // QTYPE A
    offset += 2;
    query.writeUInt16BE(0x0001, offset); // QCLASS IN
  
    return query;
  };
  