const { Web3 } = require('web3')
const assert = require('assert')
const ganache = require('ganache')
const { interface, bytecode } = require('../compile')

const web3 = new Web3(ganache.provider())

let accounts, contract

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    contract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Deployed Successfully !...'] })
        .send({ from: accounts[0], gas: '1000000' })

})

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(contract.options.address)
    });

    it('shows default message', async () => {
        const message = await contract._methods.message().call();
        assert.equal(message,'Deployed Successfully !...')
    })

    it('sends a transaction', async () => {
        await contract._methods.setMessage('bye').send({from:accounts[0]})
        const message = await contract._methods.message().call();
        assert.equal(message,'bye')
    })
})