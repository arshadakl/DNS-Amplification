
# DNS Amplification Attack Simulator

This project simulates a **DNS Amplification Attack** using JavaScript and Node.js. A DNS Amplification Attack is a type of Distributed Denial of Service (DDoS) attack that exploits the functionality of DNS servers to flood a target with a large volume of traffic. The attack takes advantage of the fact that DNS responses are typically much larger than the corresponding requests, which amplifies the traffic being sent to the target.

This project consists of two parts:
- **Attacker**: A script that sends spoofed DNS queries to a DNS server.
- **Server**: A simulated DNS server that amplifies the response to a large size, mimicking a real DNS server's behavior during an amplification attack.

The goal of this project is to demonstrate how DNS Amplification attacks work and allow researchers to experiment with them in a controlled environment. This is intended for **ethical hacking**, **cybersecurity research**, and **network security learning**.

---

## How It Works

- **Attacker (Client)**:
  - The attacker sends UDP DNS queries to a DNS server with spoofed source IP addresses (i.e., targeting the victim).
  - The queries contain random domain names, and the DNS server responds with large, amplified responses.

- **DNS Server**:
  - The server listens for incoming DNS queries, generates a large, fake response (simulating an amplification effect), and sends it back to the spoofed victim IP address.

---

## Prerequisites

Before running the project, ensure you have the following:

- **Node.js**: Version 14 or higher.
- **npm** (Node Package Manager): Installed along with Node.js.

You will also need **administrative privileges** to run the DNS server on port `53` (the default DNS port) if running locally.

---

## Installation

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/arshadakl/DNS-Amplification.git
cd DNS-Amplification
```

### 2. Install Dependencies

Navigate to the project directory and install the required npm packages:

```bash
pnpm install
```

This will install all necessary dependencies, including the `@faker-js/faker` package for generating random domain names.

---

## Running the Project

### 1. Run the DNS Amplification Server

In the `server` directory, run the DNS server to start listening for incoming DNS queries:

```bash
node server/server.js
```

This will start a DNS server that listens on port `53`. The server simulates an amplification effect by sending large DNS responses to the spoofed source IP addresses.

### 2. Run the Attacker Script

In a different terminal, run the attacker script to simulate the attack. This will send spoofed DNS queries to the server:

```bash
node attacker/attack.js
```

The attacker script will use multiple threads to send queries at a specified rate, causing the server to send amplified responses.

### 3. Test the Server

You can test the server with standard DNS query tools like `dig`:

```bash
dig @<server_ip> example.com
```

Replace `<server_ip>` with the IP address where the server is running. You should see the server log details of incoming requests.

---

## Key Takeaways

By working with this project, you will learn:

- **DNS Protocol Basics**: Learn how DNS works, the structure of DNS queries and responses, and how amplification occurs.
- **UDP Packet Handling**: Understand how DNS uses the UDP protocol for communication and how you can exploit it in amplification attacks.
- **Simulating a DNS Amplification Attack**: Gain hands-on experience in simulating a DNS amplification attack in a controlled environment.
- **Network Traffic Generation**: Learn how to generate and manipulate network traffic with Node.js using the `dgram` module for UDP packets.
- **Ethical Hacking and Cybersecurity Research**: Understand how these attacks can be used for ethical research purposes, as well as the impact on real-world systems.
- **Threaded Programming in Node.js**: Learn how to scale attacks or other types of operations using Node.js clustering to utilize multiple CPU cores.

---

## ⚠️ Warning

This project is **for educational and research purposes only**. It should only be used in a controlled environment, such as a local network, and **never used against unauthorized systems**. Conducting attacks against networks or systems without permission is illegal and unethical.

---

## Future Enhancements

Some potential improvements and extensions to this project include:

- **Real DNS Query Support**: Modify the server to handle real DNS records and simulate legitimate responses.
- **Traffic Analysis**: Add logging and analysis tools to measure the attack's impact on network performance.
- **Rate Limiting**: Implement mechanisms to limit the rate of attack queries to simulate different attack intensities.
- **Defense Mechanisms**: Develop countermeasures and detection techniques to identify and mitigate DNS amplification attacks.

---
