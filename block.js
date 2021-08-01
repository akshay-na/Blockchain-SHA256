class Block {
	constructor(timestamp, previousHash, hash, data) {
		this.timestamp = timestamp;
		this.previousHash = previousHash;
		this.hash = hash;
		this.data = data;
	}

	toString() {
		return `Block -
      Timestamp: ${this.timestamp},
      Last Hash: ${this.previousHash.substring(0, 10)},
      Hash     : ${this.hash.substring(0, 10)},
      Data     : ${this.data}
    `;
	}

	// Origin Block (1st Block)
	static genesis() {
		return new this('Genesis Time', '-----', 'f1r57-h45h', []);
	}

	// Minable new Block
	static mineBlock(lastBlock, data) {
		const timestamp = Data.now();
		const lastHash = lastBlock.hash;
		const hash = 'todo-hash';

		return new this(timestamp, lastHash, hash, data);
	}
}

module.exports = Block;
