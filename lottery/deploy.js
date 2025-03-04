const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'salute organ assault furnace cigar often metal garment birth nephew shadow faculty',
  // remember to change this to your own phrase!
  'https://sepolia.infura.io/v3/fb90268afda643c28c5dc801a41d685f'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);
  const balance = await web3.eth.getBalance(accounts[0]);
  console.log('Account balance:', web3.utils.fromWei(balance, 'ether'));

  const gasEstimate = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data: bytecode })
  .estimateGas({ from: accounts[0] });
console.log('Estimated Gas:', gasEstimate);


  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log(interface);
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
