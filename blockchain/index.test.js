const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain', () => {
    let bc, bc2; 

    beforeEach(()=>{
        bc= new Blockchain();
        bc2= new Blockchain();

    });

    it('starts with the genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis())
    });

    it('adds a new block', ()=>{
        const data = 'BatEl';
        bc.addBlock(data);

        expect(bc.chain[bc.chain.length-1].data).toEqual(data);// last block in array equals batel
    });

    it('validates a valid chain', () => {
        bc2.addBlock('BatEl');

        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    it('invalidate a chain with corrupt genesis block', ()=> {
        bc2.chain[0].data = 'wrong data';

        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('invalidates a corrupt chain', ()=>{
        bc2.addBlock('BatEl');
        bc2.chain[1].data = ('hello'); //changing the data 

        expect(bc.isValidChain(bc2.chain)).toBe(false);
    }); //invalidate a corrupt chain that isn't the genesis

    it('Replaces the chain with a valid chain', () => {
        bc2.addBlock('Tsif');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).toEqual(bc2.chain);
    });

    it('dose not replace a chain with one of less than or equal to length', () => {
        bc.addBlock('BatEl');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).not.toEqual(bc2.chain);
    })


})