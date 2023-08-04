import { ethers } from "hardhat";
import { saveToJSON, getDeployment } from "./utils";


async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // deploy introduce contract

  const introduceAddr = getDeployment("introduce").address;

  const introduce = (await ethers.getContractFactory("Introduce")).attach(introduceAddr);



  // 0x50e81916D6896f42a15F77fC1866aC7E7E9E070b
  // 0xe492037badd7748f2fd18dcdcaa7930e72181862


  console.log("Introduce indexes:", await introduce.indexes("0xe492037badd7748f2fd18dcdcaa7930e72181862"));
  
  console.log("Introduce address:", await introduce.getFirstAndSecondIntroducer("0xe492037badd7748f2fd18dcdcaa7930e72181862") );
  // deploy swap contract

//   const swap = await ethers.getContractFactory("SwapDemo");
//   const swapContract = await swap.deploy();

//   saveToJSON("swap", {
//     address: swapContract.address,
//     deployer: deployer.address,
//   });

//   console.log("Swap address:", swapContract.address);

//   await (await swapContract.setIntroduce(introduceContract.address)).wait();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
