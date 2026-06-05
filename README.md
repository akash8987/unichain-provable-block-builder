# Unichain Provable Block Builder

In 2026, user experience on Layer 2 networks demands instant execution response times without sacrificing security. **Unichain** solves this by introducing **Flashblocks**, a block-building mechanism developed in collaboration with Flashbots. Flashblocks issue streaming state updates every 200–250 milliseconds, giving users near-instant pre-confirmations.

This repository provides an advanced reference pipeline that simulates a Unichain sequencer executing transactions, packing them into rapid Flashblocks, and generating cryptographically provable execution state roots for application clients.

## Flashblock Pipeline Mechanics
- **Streaming Pre-confirmations:** Transactions are sequenced into micro-batches, providing real-time execution feedback long before the formal L2 block is minted.
- **MEV Protection:** By operating within a Trusted Execution Environment (TEE) hook, front-running and toxic sandwiches are mitigated directly at the builder tier.

## Getting Started
1. Install development framework tools: `npm install`
2. Run the continuous Flashblock block-building loop: `node simulateFlashblocks.js`
