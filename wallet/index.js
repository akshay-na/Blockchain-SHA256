const { INITIAL_BALANCE } = require('../config');
const ChainUtil = require('./chain-util');

class Wallet {
	constructor() {
		this.balance = INITIAL_BALANCE;
		this.keyPair = ChainUtil.genKeyPair();
		this.publicKey = this.keyPair.getPublic().encode('hex');
	}

	toString() {
		return `Wallet -
    PublicKey   : ${this.publicKey.toString()}
    Balance   : ${this.balance.toString()}
    `;
	}
}

module.exports = Wallet;