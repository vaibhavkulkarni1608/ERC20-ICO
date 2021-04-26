// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Crowdsale.sol";
import "./KycContract.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//import "./ERC20Mintable.sol";

//weblink: https://docs.openzeppelin.com/contracts/2.x/crowdsales
/*
   Note : This contract owns the tokens , so once we sent ethers to the wallet
   it'll send us tokens as per the rate from it's own address
*/

contract MyTokenSale is Crowdsale, ERC20 {
    //adding a KYC Pre-validation here

    KycContract kyc; //KycContract kyc is the contract-wide declaration of the kyc variable

    uint256 openingTime;
    uint256 closingTime;
    //address owner;

    modifier onlyWhileOpen {
        require(
            block.timestamp >= openingTime && block.timestamp <= closingTime,
            "Please buy on specified time"
        );
        _;
    }

    constructor(
        uint256 rate, // tells us for how many wei we can purchase a token
        address payable wallet, //this receives amount of ethers sent to crowdsale
        IERC20 token, //transfer tokens who's sending ethers to crowdsale contract
        KycContract _kyc,
        uint256 _openingTime,
        uint256 _closingTime
    ) Crowdsale(rate, wallet, token) {
        kyc = _kyc; //contarct instance once it is deployed

        openingTime = _openingTime;
        closingTime = _closingTime;
    }

    //overriding existing func. from Cowrdsale.sol

    /*
	
	
	-when you call the crowdsale contract then the _preValidatePurchase function is called. 
	-This function is initially empty, but when you override the crowdsale contract provided by openzeppelin, 
	then you can write your own _preValidatePurchase function which will be called then.
	
	
	*/

    function _preValidatePurchase(address beneficiary, uint256 weiAmount)
        internal
        view
        override
        onlyWhileOpen
    {
        super._preValidatePurchase(beneficiary, weiAmount); //calling func. of base class

        require(
            kyc.KycCompleted(msg.sender),
            "Kyc not comleted, purchase not allowed"
        );
    }

    // function mintOwner() public {

    //     owner = msg.sender;
    // }

    // modifier onlyOwner {
    //     require(msg.sender == owner);
    //     _;
    // }

    // function mint(address account, uint256 amount)
    //     public
    //     onlyOwner
    //     returns (bool)
    // {
    //     return true;
    // }
}

// function _deliverTokens(address beneficiary, uint256 tokenAmount) internal {
//     // Potentially dangerous assumption about the type of the token.
//     require(
//         ERC20Mintable(address(token())).mint(beneficiary, tokenAmount),
//         "MintedCrowdsale: minting failed"
//     );
// }

// function releaseTime() public view virtual override returns (uint256) {
//     return _releaseTime;
// }
