####Day1
##project setup and Install dependencies

-install truffle - sudo npm install -g truffle
-install truffle box - truffle unbox react
-remove simple storage file
-remove 2\_ migration file
-delete both test files

##import openzeppelin & Deploy a contract

-create initial package.json file(no spaces & no Capital words in folder name) : npm init
-import openzeppelin and add entry to package.json : npm install --save @openzeppelin/contracts
-create MyToken.sol (inside contracts folder)
-finish up writing token contract

###Day2
##contract deployment

-migrate contract to blockchain so create new file : 2_deploy_contracts.js
-finish up writing migration file (copy from 1_initial_migration.js)
-goto developer console (you'lll see a/c, private keys/mnemonic): truffle developer
-edit truffle-config.js and lock solidity version
-perform migration by saying : migrate
-replace solidity version as ^0.8.0 (if error occurs)
-to exit develoepr console : .exit

##adding unit testing(make sure to keep ganache running)

-weblink : https://github.com/OpenZeppelin/openzeppelin-test-helpers/blob/master/src/setup.js
-npm install --save chai chai-bn chai-as-promised : bn - big number (install all these)
-create a test file to write our first test : MyToken.test.js
-config truffle-config.js : add host,post and network from ganache (if test is failing) - if not no need to start ganache
-to execute testing (on truffle console) : test
-if test fails try running : (truffle compile) and then : (truffle test)

###Day3
-weblink(crowdsale) : https://docs.openzeppelin.com/contracts/2.x/crowdsales
##adding more tests

-add second and test case in : MyToken.test.js
-add crowdsale contract : copy from openzeppelin website(v 2.5.0)
-update all the imports
-create our token sale contarct on above imported contract as a inherited contract (perform truffle-flattener here)
-perform migration for newly created crowdsale contarct
-fix the test-case as we've transferred all the tokens from deployer's a/c to contract

###Day4
-consolidating our config. into .env file - npm install --save dotenv
-create .env file - always recommended for keeping data consistent, uniform and safe in production
-write test-cases for crowdsale contract (copy initial config. code from previous test): MyTokenSale.test.js
-combine config. from all test files and add it to : setupchai.js
-for truffle suite error : add return stmt. in the last after all the test cases in both files
-for truffle suite error : 'npm uninstall -g truffle' and 'npm install -g truffle@5.1.10'
-add more test in Tokensale contract

##Day5
-add KYC functionality - override prevalidate function from crowdsale contract also use Ownable form openzep : kycContract.so
-add into MyTokenSale.sol and migration.js
-update KYCtest in MyTokenSale.test.sol

##Day6
-start working on front-end : app.js
-goto client folder : npm run start

##Day7
-kyc whitelisting  => front-end 
-setup => rpc => private n/w connection => ganache
