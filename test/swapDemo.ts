import { expect } from "chai";
import { ethers } from "hardhat";

describe("Swap demo Test", function () {
  it("Swap demo ", async function () {
    const ZeroAddress = "0x0000000000000000000000000000000000000000";

    const [A, B, C, D, E] = await ethers.getSigners();
    console.log("A", A.address);
    console.log("B", B.address);
    console.log("C", C.address);
    console.log("D", D.address);
    console.log("E", E.address);

    //deploy introduce contract
    const introduce = await ethers.getContractFactory("Introduce");
    const introduceContract = await introduce.deploy();


    //deploy swap contract
    const swap = await ethers.getContractFactory("SwapDemo");
    const swapContract = await swap.deploy();


    await swapContract.setIntroduce(introduceContract.address);

    //call contract
    await swapContract["swap(address,uint256)"](A.address, 100000);

    const AIndex = await introduceContract.indexes(A.address);

    expect(AIndex).to.equal(1);
    expect(await swapContract.profitBalances(A.address)).to.equal(0);

    // A introduce B

    await swapContract["swap(uint256,address,uint256)"](AIndex, B.address, 100000);

    const BIndex = await introduceContract.indexes(B.address);

    expect(BIndex).to.equal(2);

    expect(await swapContract.profitBalances(B.address)).to.equal(0);
    expect(await swapContract.profitBalances(A.address)).to.equal(40);


    // B introduce C

    await swapContract["swap(uint256,address,uint256)"](BIndex, C.address, 100000);

    const CIndex = await introduceContract.indexes(C.address);

    expect(CIndex).to.equal(3);

    expect(await swapContract.profitBalances(C.address)).to.equal(0);

    expect(await swapContract.profitBalances(B.address)).to.equal(20);

    expect(await swapContract.profitBalances(A.address)).to.equal(80);


  })

});