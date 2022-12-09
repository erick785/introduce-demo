import { expect } from "chai";
import { ethers } from "hardhat";

describe("Introduce Test", function () {
  it("introduce ", async function () {
    const ZeroAddress = "0x0000000000000000000000000000000000000000";

    const [A,B,C,D,E] = await ethers.getSigners();
    console.log("A",A.address);
    console.log("B",B.address);
    console.log("C",C.address);
    console.log("D",D.address);
    console.log("E",E.address);

    //deploy contract
    const introduce = await ethers.getContractFactory("Introduce");
    const introduceContract = await introduce.deploy();

    //call contract
    await introduceContract["addIntroducer(address)"](A.address);

    const AIndex = await introduceContract.indexes(A.address);

    expect(AIndex).to.equal(1);

    // A introduce B
    let introducers = await introduceContract.getFirstAndSecondIntroducer(A.address);

    expect(introducers[0]).to.equal(ZeroAddress);
    expect(introducers[1]).to.equal(ZeroAddress);


    await introduceContract["addIntroducer(uint256,address)"](AIndex,B.address);

    const BIndex = await introduceContract.indexes(B.address);

    expect(BIndex).to.equal(2);


    introducers = await introduceContract.getFirstAndSecondIntroducer(B.address);

    expect(introducers[0]).to.equal(A.address);
    expect(introducers[1]).to.equal(ZeroAddress);

    // B introduce C
    await introduceContract["addIntroducer(uint256,address)"](BIndex,C.address);

    const CIndex = await introduceContract.indexes(C.address);

    expect(CIndex).to.equal(3);

    introducers = await introduceContract.getFirstAndSecondIntroducer(C.address);

    expect(introducers[0]).to.equal(A.address);
    expect(introducers[1]).to.equal(B.address);


    // C introduce D
    await introduceContract["addIntroducer(uint256,address)"](CIndex,D.address);

    const DIndex = await introduceContract.indexes(D.address);

    expect(DIndex).to.equal(4);

    introducers = await introduceContract.getFirstAndSecondIntroducer(D.address);

    expect(introducers[0]).to.equal(B.address);
    expect(introducers[1]).to.equal(C.address);


    // B introduce E
    await introduceContract["addIntroducer(uint256,address)"](BIndex,E.address);

    const EIndex = await introduceContract.indexes(E.address);

    expect(EIndex).to.equal(5);

    introducers = await introduceContract.getFirstAndSecondIntroducer(E.address);


    expect(introducers[0]).to.equal(A.address);
    expect(introducers[1]).to.equal(B.address);

    // A 重复添加 D (不生效)
    await introduceContract["addIntroducer(uint256,address)"](AIndex,D.address);

    introducers = await introduceContract.getFirstAndSecondIntroducer(D.address);

    expect(introducers[0]).to.equal(B.address);
    expect(introducers[1]).to.equal(C.address);

  })

});