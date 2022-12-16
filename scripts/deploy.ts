import { ethers } from "hardhat";
import { saveToJSON, getDeployment } from "./utils";


async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // deploy introduce contract
  const introduce = await ethers.getContractFactory("Introduce");
  const introduceContract = await introduce.deploy();

  saveToJSON("introduce", {
    address: introduceContract.address,
    deployer: deployer.address,
  });

  console.log("Introduce address:", introduceContract.address);
  // deploy swap contract

  const swap = await ethers.getContractFactory("SwapDemo");
  const swapContract = await swap.deploy();

  saveToJSON("swap", {
    address: swapContract.address,
    deployer: deployer.address,
  });

  console.log("Swap address:", swapContract.address);

  await (await swapContract.setIntroduce(introduceContract.address)).wait();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
