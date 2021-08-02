const { INITIAL_BALANCE } = require('../config');

class Wallet {
	constructor() {
		this.balance = INITIAL_BALANCE;
		this.keyPair = null;
		this.publicKey = null;
	}

	toString() {
		return `Wallet -
    PublicKey   : ${this.publicKey.toString()}
    Balance   : ${this.balance.toString()}
    `;
	}
}

module.exports = Wallet;
