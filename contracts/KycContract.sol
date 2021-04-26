// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract KycContract is Ownable {
    mapping(address => bool) allowed;

    //who ever is calling this, is allowed to purchase token
    function setKycCompleted(address _addr) public onlyOwner {
        allowed[_addr] = true;
    }

    //who ever is calling this, is not allowed to purchase token
    function setKycRevoked(address _addr) public onlyOwner {
        allowed[_addr] = false;
    }

    //checking if KYC is already completed
    function KycCompleted(address _addr) public view returns (bool) {
        return allowed[_addr];
    }
}
