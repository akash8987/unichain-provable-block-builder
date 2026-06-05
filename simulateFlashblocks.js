const crypto = require('crypto');

class UnichainFlashblockBuilder {
    constructor() {
        this.currentFlashblockHeight = 0;
        this.txMempool = [];
        this.parentBlockStateRoot = crypto.createHash('sha256').update('UNICHAIN_BASE_STATE').digest('hex');
    }

    /**
     * Ingests user transaction payloads into the low-latency builder loop.
     */
    submitTransaction(tx) {
        console.log(`[Mempool Ingest] Received TX: ${tx.hash} (Gas Premium: ${tx.tip} gwei)`);
        this.txMempool.push(tx);
    }

    /**
     * Generates a rapid micro-block confirmation (Flashblock) every 250ms.
     */
    buildFlashblock() {
        if (this.txMempool.length === 0) {
            return;
        }

        this.currentFlashblockHeight++;
        console.log(`\n--- Streaming Flashblock Sub-Block #${this.currentFlashblockHeight} ---`);

        const batchToPack = [...this.txMempool];
        this.txMempool = []; // Flush mempool instantly

        let stateAccumulator = Buffer.from(this.parentBlockStateRoot);
        
        batchToPack.forEach(tx => {
            console.log(` -> Ordering & Executing TX: ${tx.hash} inside TEE-protected environment`);
            stateAccumulator = Buffer.concat([stateAccumulator, Buffer.from(tx.hash)]);
        });

        // Compute new un-finalized state root mapping for real-time user feedback
        this.parentBlockStateRoot = crypto.createHash('sha256').update(stateAccumulator).digest('hex');
        
        console.log(`[Flashblock Live] Pre-confirmation State Root: ${this.parentBlockStateRoot}`);
        console.log(`[Status] Dispatched to user client. Execution latency: 210ms.`);
    }
}

const builder = new UnichainFlashblockBuilder();

// Mock immediate user transactions
builder.submitTransaction({ hash: "0x3a91b...f22", tip: 1.5 });
builder.submitTransaction({ hash: "0xde55c...7a1", tip: 2.0 });

// Trigger the streaming millisecond block building mechanic
builder.buildFlashblock();

// Subsequent rapid user trade submission
setTimeout(() => {
    builder.submitTransaction({ hash: "0x7c65c...bb9", tip: 0.8 });
    builder.buildFlashblock();
}, 250);
