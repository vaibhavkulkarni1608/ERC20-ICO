import React, { Component } from "react";
//importing all ABI's
import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyTokenSale.json";
import KycContract from "./contracts/KycContract.json";

import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {



    //make state empty and use it as a class variable
    state = { loaded: false, tokenSaleAddress: null, userTokens: 0 }; //initially our app is not loaded

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            this.web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            this.accounts = await this.web3.eth.getAccounts();

            // Get the contract instance.
            this.networkId = await this.web3.eth.net.getId();

            this.tokenInstance = new this.web3.eth.Contract(
                MyToken.abi,
                MyToken.networks[this.networkId] && MyToken.networks[this.networkId].address,
            );

            this.tokensaleInstance = new this.web3.eth.Contract(
                MyTokenSale.abi,
                MyTokenSale.networks[this.networkId] && MyTokenSale.networks[this.networkId].address,
            );

            this.kycInstance = new this.web3.eth.Contract(
                KycContract.abi,
                KycContract.networks[this.networkId] && KycContract.networks[this.networkId].address,
            );

            this.listenTokenTransfer()

            //empty this as well
            this.setState({ loaded: true, tokenSaleAddress: MyTokenSale.networks[this.networkId].address }, this.updateUserTokens); // app is fully loaded
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }

    };

    //update token here
    updateUserTokens = async () => {
        let userTokens = await this.tokenInstance.methods.balanceOf(this.accounts[0]).call()
        this.setState({ userTokens: userTokens })
    }

    //listen to token transfer

    listenTokenTransfer = async () => {
        this.tokenInstance.events.Transfer({ to: this.accounts[0] }).on("data", this.updateUserTokens)
    }


    //handle buyToken here

    handleBuyTokens = async () => {
        await this.tokensaleInstance.methods.buyTokens(this.accounts[0]).send({ from: this.accounts[0], value: this.web3.utils.toWei("1", "wei") })
    }

    //handle user address for kyc whitelisting
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value //here [name] = kycAddress and value = user a/c address
        })
    }

    //handle kyc whitelisting functionality
    handleKycWhitelisting = async () => {
        //                                     user a/c addr                contract deployer/owner address   
        await this.kycInstance.methods.setKycCompleted(this.state.kycAddress).send({ from: this.accounts[0] })
        alert("KYC for" + this.state.kycAddress + "is completed")
    }



    render() {
        if (!this.state.loaded) {
            return <div> Loading Web3, accounts, and contract...!</div>;
        }
        return (
            <div className="App" >
                <h1>My Coffee Token Sale</h1>
                <p>Grab your Tokens today!</p>
                <h2>Kyc Whitelisting</h2>

                Address to allow: <input type="text" name="kycAddress" placeholder="Enter Address here" value={this.state.kycAddress} onChange={this.handleInputChange} />

                <button type="button" onClick={this.handleKycWhitelisting}> Add to Whitelist</button>

                <h2>Buy Tokens</h2>

                <p> If you want to buy Tokens , send Wei to this address : {this.state.tokenSaleAddress}</p>

                <p>You currently have: {this.state.userTokens}</p>

                <button type="button" onClick={this.handleBuyTokens}>Buy More Tokens</button>

                <p>Hurry up! Time Left:- 23/04/2021 to 24/04/2021</p>

            </div>
        );
    }
}

export default App;