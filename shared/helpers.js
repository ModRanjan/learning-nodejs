const fs = require('fs');
const path = require('path');
const hre = require('hardhat');

async function sendTxn(txnPromise, label) {
  const txn = await txnPromise;
  console.info(`Sending ${label}...`);
  await txn.wait();
  console.info('... Sent!');
  return txn;
}

async function callWithRetries(func, args, retriesCount = 3) {
  let i = 0;
  while (true) {
    i++;
    try {
      return await func(...args);
    } catch (ex) {
      if (i === retriesCount) {
        console.error('call failed %s times. throwing error', retriesCount);
        throw ex;
      }
      console.error('call i=%s failed. retrying....', i);
      console.error(ex.message);
    }
  }
}

async function deployContract(name, args, deployer, options) {
  console.log('deployer', deployer);
  const contractFactory = await ethers.getContractFactory(name, deployer);
  let contract;
  if (options) {
    contract = await contractFactory.deploy(...args, options);
  } else {
    contract = await contractFactory.deploy(...args);
  }

  const argStr = args.map((i) => `"${i}"`).join(' ');

  console.info(`${name} : ${contract.address} `);
  if (args) {
    console.info(`With these arguments\n ${argStr}`);
  }

  // wait for 1 block transactions to ensure deployment before verifying
  await contract.deployTransaction.wait(5);
  console.info('... Completed!');
  return contract;
}

async function contractAt(name, address, provider) {
  let contractFactory = await ethers.getContractFactory(name);
  if (provider) {
    contractFactory = contractFactory.connect(provider);
  }
  return await contractFactory.attach(address);
}

const tmpAddressesFilepath = path.join(__dirname, '..', `.tmp-addresses.json`);

function readTmpAddresses() {
  if (fs.existsSync(tmpAddressesFilepath)) {
    return JSON.parse(fs.readFileSync(tmpAddressesFilepath));
  }
  return {};
}

function writeTmpAddresses(json) {
  const tmpAddresses = Object.assign(readTmpAddresses(), json);
  fs.writeFileSync(tmpAddressesFilepath, JSON.stringify(tmpAddresses));
}

async function VerifyContract(address, args) {
  //verify (source: https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-etherscan#using-programmatically)
  if (args) {
    await hre.run('verify:verify', {
      address: address,
      constructorArguments: [...args],
    });
  } else {
    await hre.run('verify:verify', {
      address: address,
    });
  }
}

module.exports = {
  sendTxn,
  deployContract,
  contractAt,
  writeTmpAddresses,
  readTmpAddresses,
  callWithRetries,
  VerifyContract,
};
