
//all contracts
const TokenSale = artifacts.require("MyTokenSale")
const Token = artifacts.require("MyToken")
const KycContract = artifacts.require("KycContract")


//test-config.
const chai = require("./setupchai.js")
const BN = web3.utils.BN
const expect = chai.expect;


//start writing test from here
contract("TokenSale Test", async (accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts;


    //no tokens in deployer account
    it("should not have any tokens in deployer account", async () => {
        let instance = await Token.deployed()
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0))
    })

    //all tokens in tokensale contract
    it("all tokens should be in tokensale contract", async () => {
        let instance = await Token.deployed()
        let balanceOfTokenSaleContract = await instance.balanceOf(TokenSale.address)
        let totalSupply = await instance.totalSupply() //10000 tokens
        expect(balanceOfTokenSaleContract).to.be.a.bignumber.equal(totalSupply)
    })

    //we can perform buying tokens
    it("should be possible to buy tokens", async () => {
        let tokenSaleInstance = await TokenSale.deployed()
        let kycInstance = await KycContract.deployed()

        //kyc check 
        await kycInstance.KycCompleted(deployerAccount, { from: deployerAccount }) //deployer is trying to whitelist himself

        //deploer should get 1 wei => 1wei = 1 token
        expect(tokenSaleInstance.sendTransaction({ from: deployerAccount, value: web3.utils.toWei("1", "wei") })).to.be.fulfilled

    })
    export default function latestTime() {
        return web3.eth.getBlock('latest').timestamp;
    }



})