const path = require('path');
const solc = require('solc');
const fs = require('fs');

const pathToInbox = path.resolve(__dirname, 'contracts', 'inbox.sol');
const source = fs.readFileSync(pathToInbox, 'utf8');

module.exports = solc.compile(source,1).contracts[':Inbox']