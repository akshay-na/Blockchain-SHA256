const ChainUtil = require('../chain-util');

class Transaction {
	constructor() {
		this.id = ChainUtil.id();
		this.input = null;
		this.outputs = [];
	}

	static newTransaction(sendersWallet, recipient, amount) {
		const transaction = new this();

		if (amount > sendersWallet.balance) {
			console.log(`Amount ${amount} exceeds balance.`);
			return;
		}

		transaction.outputs.push(
			...[
				{ amount: sendersWallet.balance - amount, address: sendersWallet.publicKey },
				{ amount, address: recipient }
			]
		);

		Transaction.signTransaction(transaction, sendersWallet);

		return transaction;
	}

	static signTransaction(transaction, sendersWallet) {
		transaction.input = {
			timestamp: Date.now(),
			amount: sendersWallet.balance,
			address: sendersWallet.publicKey,
			signature: sendersWallet.sign(ChainUtil.hash(transaction.outputs))
		};
	}

	static verifyTransaction(transaction) {
		return ChainUtil.verifySignature(
			transaction.input.address,
			transaction.input.signature,
			ChainUtil.hash(transaction.outputs)
		);
	}

	update(sendersWallet, recipient, amount) {
		const senderOutputs = this.outputs.find((output) => output.address === sendersWallet.publicKey);

		if (amount > senderOutputs.amount) {
			console.log(`Amount: ${amount} exceeds balance`);
			return;
		}

		senderOutputs.amount = senderOutputs.amount - amount;
		this.outputs.push({ amount, address: recipient });

		Transaction.signTransaction(this, sendersWallet);
		return this;
	}
}

module.exports = Transaction;
