const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

// HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev

app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
	res.json(bc.chain);
});

app.post('/mine', (req, res) => {
	const block = bc.addBlock(req.body.data);
	console.log(`New block added ${block.toString()}`);

	p2pServer.syncChain();

	res.redirect('/blocks');
});

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen();
