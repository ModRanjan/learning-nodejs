# Sample node-hardhat Boilerplate

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.
 
And Some Basic Configuration about ' _hardhat.config.js_ ' file.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
GAS_REPORT=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
## Here We are using the 
> @nomicfoundation/hardhat-toolbox plugin

A plugin that bundles all the things you need to start working with Hardhat. Hardhat plugins we recommend to start developing with Hardhat.

When you use this plugin, you'll be able to:

1. Deploy and interact with your contracts using [_ethers.js_](https://docs.ethers.io/v5/) and the [_hardhat-ethers_](https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-ethers) plugin.
2. Test your contracts with [_Mocha_](https://mochajs.org/), [_Chai_](https://www.chaijs.com/) and our own [_Hardhat Chai Matchers_](https://hardhat.org/hardhat-chai-matchers/docs/overview) plugin.
3. Interact with Hardhat Network with our [_Hardhat Network Helpers_](https://hardhat.org/hardhat-network-helpers/docs/overview).
4. Verify the source code of your contracts with the [_hardhat-etherscan_](https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-etherscan) plugin.
5. Get metrics on the gas used by your contracts with the [_hardhat-gas-reporter_](https://github.com/cgewecke/hardhat-gas-reporter) plugin.
6. Measure your tests coverage with [_solidity-coverage_](https://github.com/sc-forks/solidity-coverage).
And, if you are using TypeScript, get type bindings for your contracts with [_Typechain_](https://github.com/dethcrypto/TypeChain/)

```shell
npm install --save-dev @nomicfoundation/hardhat-toolbox
```
For more information : [click here](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-toolbox)
