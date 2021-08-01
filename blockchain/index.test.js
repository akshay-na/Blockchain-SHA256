const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain', () => {
	let bc, bc2;

	beforeEach(() => {
		bc = new Blockchain();
		bc2 = new Blockchain();
	});

	it('starts with genesis block', () => {
		expect(bc.chain[0]).toEqual(Block.genesis());
	});

	it('adds a new block', () => {
		bc.addBlock('foo');
		expect(bc.chain[bc.chain.length - 1].data).toEqual('foo');
	});

	it('validates a valid chain', () => {
		bc2.addBlock('foo');
		expect(bc.isValidChain(bc2.chain)).toBe(true);
	});

	it('Invalidates a chain with corrupt genesis block', () => {
		bc2.chain[0].data = 'Bad data';
		expect(bc.isValidChain(bc2.chain)).toBe(false);
	});

	it('Invalidates a corrupt chain', () => {
		bc2.addBlock('new Block');
		bc2.chain[1].data = 'foo';
		expect(bc.isValidChain(bc2.chain)).toBe(false);
	});

	it('replaces a chain with valid chain', () => {
		bc2.addBlock('goo');
		bc.replaceChain(bc2.chain);
		expect(bc.chain).toEqual(bc2.chain);
	});

	it('does not replace a chain with one of less than or equal to length', () => {
		bc.addBlock('foo');
		bc.replaceChain(bc2.chain);
		expect(bc.chain).not.toEqual(bc2.chain);
	});
});
