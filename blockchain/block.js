const sha256 = require('crypto-js/sha256');
const SHA256 = require('crypto-js/sha256');   //generate unique hash based on the given data
const {DIFFICULTY, MINE_RATE} = require('./config');



class Block {
    constructor (timestamp, lastHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash =  hash; 
        this.data =  data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;

    }
    toString () {
        return `Block -
        TimeStamp :  ${this.timestamp}
        Last Hash :  ${this.lastHash.substring(0 ,10)}
        Hash :       ${this.hash.substring(0,10)}
        Nonce :      ${this.nonce}
        difficulty : ${this.difficulty}
        Data :       ${this.data}`
    }
    static genesis (){
        return new this ('Genesis time', '---', 'f1r57-h45h', [], 0, DIFFICULTY)
    }
    static mineBlock (lastBlock ,data) {
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        let {difficulty} = lastBlock;
        let nonce = 0; 

        do {
          nonce++;
          difficulty = Block.adjustDifficulty(lastBlock , timestamp);
          timestamp = Date.now();
          hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
        } while(hash.substring(0, difficulty) !== '0'.repeat(difficulty) );  //proof of work algorithm 

       

        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    static hash(timestamp, lastHash, data, nonce, difficulty) {
        return SHA256(`${timestamp} ${lastHash} ${data} ${nonce} ${difficulty}`).toString();
    }

    static blockHash(block) {
        const {timestamp, lastHash ,data, nonce, difficulty} = block;

        return Block.hash(timestamp, lastHash , data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock , currentTime) {
        let { difficulty } = lastBlock ; 
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty -1; 
        return difficulty; 
    }
}

    module.exports = Block;