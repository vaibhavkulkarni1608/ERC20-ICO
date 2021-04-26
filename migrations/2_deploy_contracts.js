//artifacts are json files which are crated by truffle when it compiled contarcts
let MyToken = artifacts.require('MyToken')
let MyTokenSale = artifacts.require("MyTokenSale")
let MyKycContract = artifacts.require("KycContract")


require('dotenv').config({ path: "../.env" }) //for importing .env file //console.log(process.env)

let duration = {
    seconds: function (val) { return val; },
    minutes: function (val) { return val * this.seconds(60); },
    hours: function (val) { return val * this.minutes(60); },
    days: function (val) { return val * this.hours(24); },
    weeks: function (val) { return val * this.days(7); },
    years: function (val) { return val * this.days(365); },
};




//deployer is the handle to deploy these contracts on bc
module.exports = async function (deployer) {

    let latestTime = Math.floor(Date.now() / 1000); //To get the timestamp in seconds, you can use


    let _openingTime = latestTime + duration.minutes(1);
    let _closingTime = _openingTime + duration.days(1);



    let addr = await web3.eth.getAccounts()

    await deployer.deploy(MyKycContract)
    await deployer.deploy(MyToken)
    await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address, MyKycContract.address, _openingTime, _closingTime)


    let instance = await MyToken.deployed()

    await instance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS) //transferring all the tokens to MyTokenSale contract

}