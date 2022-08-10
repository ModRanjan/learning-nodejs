require("@nomicfoundation/hardhat-toolbox");
// No need to explicitly import these plugins
// @nomiclabs/hardhat-ethers
// @nomiclabs/hardhat-etherscan
// hardhat-gas-reporter
// solidity-coverage
// @typechain/hardhat
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL;
const ARBITRUM_Rinkeby_RPC_URL = process.env.ARBITRUM_Rinkeby_RPC_URL;
const ARBISCAN_API_KEY = process.env.ARBISCAN_API_KEY;
const PRIVATE_KEY1 = process.env.PRIVATE_KEY1;
const PRIVATE_KEY2 = process.env.PRIVATE_KEY2;
const PRIVATE_KEY3 = process.env.PRIVATE_KEY3;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      url: RINKEBY_RPC_URL,
      gas: 2100000,    // should be "auto" or a number
      gasPrice: 8000000000,
      accounts: [PRIVATE_KEY1, PRIVATE_KEY2, PRIVATE_KEY3].filter(
        (x) => x !== undefined
      ),
      chainId: 4,
      saveDeployments: true
    }
  },
  solidity: {
    compilers: [
      { version: '0.8.9' },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  etherscan: {
    apiKey: {
      mainnet: 'YOUR_ETHERSCAN_API_KEY',
      rinkeby: ETHERSCAN_API_KEY,
      ropsten: 'YOUR_ETHERSCAN_API_KEY',
      goerli: 'YOUR_ETHERSCAN_API_KEY',
      // binance smart chain
      bsc: 'YOUR_BSCSCAN_API_KEY',
      bscTestnet: 'YOUR_BSCSCAN_API_KEY',
      // optimistim
      optimisticEthereum: 'YOUR_OPTIMISTIC_ETHERSCAN_API_KEY',
      optimisticKovan: 'YOUR_OPTIMISTIC_ETHERSCAN_API_KEY',
      // polygon
      polygon: 'YOUR_POLYGONSCAN_API_KEY',
      polygonMumbai: 'YOUR_POLYGONSCAN_API_KEY',
      // arbitrum
      arbitrumOne: 'YOUR_ARBISCAN_API_KEY',
      arbitrumTestnet: ARBISCAN_API_KEY
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000  // 3000000 : 3000 seconds max for running tests
  }
}