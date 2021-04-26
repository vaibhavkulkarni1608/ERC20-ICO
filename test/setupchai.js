"use strict"

const { assert } = require('chai')
let chai = require('chai')
const BN = web3.utils.BN //big no. is a javascript class helps us to perform arithmetic op.
const chaiBN = require('chai-bn')(BN)
chai.use(chaiBN)

let chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

module.exports = chai