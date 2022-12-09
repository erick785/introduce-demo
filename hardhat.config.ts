import { HardhatUserConfig,task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-contract-sizer';
import 'hardhat-abi-exporter';

import * as dotenv from "dotenv";

dotenv.config();


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});



const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    env: {
      url: process.env.URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY.split(",") : [],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
