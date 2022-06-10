const Block = require('./block');
const {DIFFICULTY} = require('./config');

describe('Block', () => {
    let data, lastBlock, block; 
beforeEach(()=>{
     data = 'Bat El';
     lastBlock = Block.genesis();
     block = Block.mineBlock(lastBlock, data);
})

it('sets the `data` to match the input', ()=>{
    expect(block.data).toEqual(data);
});

// another test, similar check for the arrtibutes, but this time checks the last hash
it('sets the `lastHash` to match the hash of the last block', ()=>{
expect(block.lastHash).toEqual(lastBlock.hash);
});

it('generates a hash that matches the difficulty', ()=> {
expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
});

it('lowers the difficulty for slowly mined blocks', () => {
    expect(Block.adjustDifficulty(block, block.timestamp+ 3600))
    .toEqual(block.difficulty-1);
})

});