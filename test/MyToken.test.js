//weblink : https://github.com/OpenZeppelin/openzeppelin-test-helpers/blob/master/src/setup.js

//set-up inital config. for tests (ref. above link)
const Token = artifacts.require("MyToken")

const chai = require("./setupchai.js")
const BN = web3.utils.BN
const expect = chai.expect;

//start writing test from here

contract("Token Test", async(accounts) => {


    //used in test two => automatically assigned a/c from accounts as per index
    //cons[account[0], account[1], account[2]]
    const [deployerAccount, recipient, anotherAccount] = accounts;

    //execute this block before below tests
    //here deploy new instance of contract before executing below tests and not using from migration file
    beforeEach(async() => {
        this.myToken = await Token.new()
    })

    //first test
    it("all tokens should be in my account", async() => {

        //old
        // let instance = await Token.deployed() //Token is defined on 1st line -  try :  //console.log(instance)
        // let totalSupply = await instance.totalSupply()

        //let balance = await instance.balanceof(accounts[0])
        //assert.equal(balance.valueof(), initialSupply.valueof(), "The balance was not same")

        //replacement for above two lines
        //expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply)

        //replace account[0] with deployerAccount
        // expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply)

        //new
        let instance = this.myToken //Token is defined on 1st line -  try :  //console.log(instance)
        let totalSupply = await instance.totalSupply()

        // let balance = await instance.balanceof(accounts[0])
        // assert.equal(balance.valueof(), initialSupply.valueof(), "The balance was not same")

        //replacement for above two lines
        //expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply)

        //replace account[0] with deployerAccount
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply)

    })

    //Second Test
    it("is not possible to send more tokens than available in total", async() => {
        //old
        // let instance = await Token.deployed()
        // let balanceOfDeployer = await instance.balanceOf(deployerAccount)
        // expect(instance.transfer(recipient, new BN(balanceOfDeployer + 1))).to.eventually.be.rejected //try adding 1 to make test pass
        // expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer)

        //new
        let instance = this.myToken
        let balanceOfDeployer = await instance.balanceOf(deployerAccount)
        expect(instance.transfer(recipient, new BN(balanceOfDeployer + 1))).to.eventually.be.rejected //try adding 1 to make test pass
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer)

    })

    //Third test (sending one token from deployer a/c to recipient a/c )
    it("is possible to send tokens between accounts", async() => {
        //old
        // const sendTokens = 1
        // let instance = await Token.deployed()
        // let totalSupply = await instance.totalSupply()

        // expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply)
        // expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled //we'lll just check if this promise is fulfilled or not and no need to write try and catch blocks here
        // expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)))
        // expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens))

        //new
        const sendTokens = 1
        let instance = this.myToken
        let totalSupply = await instance.totalSupply()

        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply)
        expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled //we'lll just check if this promise is fulfilled or not and no need to write try and catch blocks here
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)))
        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens))

    })


})