
class Miner {
constructor(blockchain, transactionPool, wallet, p2pServer) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.p2pServer = p2pServer;
}
    mine() {
        const validTransactions = this.transactionPool.validTransactions();
        // include reward for the miner
        // create a block consisting of the valid transactions 
        // sync the chains in the peer-to-peer server
        // broadcast to every miner to clear their transaction pool
    }

}

module.exports = Miner;