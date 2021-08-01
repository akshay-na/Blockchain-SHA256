const Blockchain = require('../src/blockchain');
const Block = require('../src/block');

describe('Blockchain', () => {
	let bc;

	beforeEach(() => {
		bc = new Blockchain();
	});

	it('starts with genesis block', () => {
		expect(bc.chain[0]).toEqual(Block.genesis());
	});

	it('adds a new block', () => {
		const data = 'new Block';
		bc.addBlock(data);
		expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
	});
});
