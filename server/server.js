import dgram from 'dgram';
import { config } from './config.js';

const { PORT, RESPONSE_SIZE, LOG_REQUESTS } = config;

const server = dgram.createSocket('udp4');

// Function to generate a fake DNS response
const createFakeResponse = (request) => {
  const response = Buffer.alloc(RESPONSE_SIZE);
  response.write(request.toString('ascii', 0, 2), 0, 'ascii'); 
  response.write('FAKE DNS RESPONSE'.repeat(RESPONSE_SIZE / 16), 2, 'ascii');
  return response;
};

// Handle incoming DNS requests
server.on('message', (msg, rinfo) => {
  const transactionId = msg.toString('hex', 0, 2);

  if (LOG_REQUESTS) {
    console.log(`[${new Date().toISOString()}] Received query from ${rinfo.address}:${rinfo.port} with Transaction ID: ${transactionId}`);
  }

  const response = createFakeResponse(msg);
  server.send(response, rinfo.port, rinfo.address, (err) => {
    if (err) {
      console.error(`Error sending response to ${rinfo.address}:${rinfo.port}:`, err.message);
    } else if (LOG_REQUESTS) {
      console.log(`[${new Date().toISOString()}] Sent amplified response (${RESPONSE_SIZE} bytes) to ${rinfo.address}:${rinfo.port}`);
    }
  });
});

server.bind(PORT, () => {
  console.log(`DNS Amplification Server is running on port ${PORT}`);
});
