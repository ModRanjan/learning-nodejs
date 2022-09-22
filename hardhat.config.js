require('@nomicfoundation/hardhat-toolbox');
// No need to explicitly import these plugins
// @nomiclabs/hardhat-ethers
// @nomiclabs/hardhat-etherscan
// hardhat-gas-reporter
// solidity-coverage
// @typechain/hardhat
require('@nomicfoundation/hardhat-chai-matchers');
require('@nomiclabs/hardhat-ethers');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const ARBISCAN_API_KEY = process.env.ARBISCAN_API_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const PRIVATE_KEY1 = process.env.PRIVATE_KEY1;
const PRIVATE_KEY2 = process.env.PRIVATE_KEY2;
const PRIVATE_KEY3 = process.env.PRIVATE_KEY3;

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
      gas: 2100000, // should be "auto" or a number
      gasPrice: 8000000000,
      accounts: [PRIVATE_KEY1, PRIVATE_KEY2, PRIVATE_KEY3].filter(
        (x) => x !== undefined,
      ),
      chainId: 4,
      saveDeployments: true,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY1, PRIVATE_KEY2, PRIVATE_KEY3].filter(
        (x) => x !== undefined,
      ),
      chainId: 5,
      saveDeployments: true,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY1, PRIVATE_KEY2, PRIVATE_KEY3].filter(
        (x) => x !== undefined,
      ),
    },
    arbitrumRinkeby: {
      url: `https://arbitrum-rinkeby.infura.io/v3/${INFURA_API_KEY}`,
    },
    arbitrum: {
      url: `https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    },
    optimismKovan: {
      url: `https://optimism-kovan.infura.io/v3/${INFURA_API_KEY}`,
    },
    optimism: {
      url: `https://optimism-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 80001,
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    },
  },
  solidity: {
    compilers: [{ version: '0.8.9' }],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
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
      arbitrumTestnet: ARBISCAN_API_KEY,
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 40000, // 3000000 : 3000 seconds max for running tests
  },
};
