const Block = require('./block');

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
})
});