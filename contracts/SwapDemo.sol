// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Introduce.sol";

contract SwapDemo is Ownable {
    Introduce public introduce;
    // 手续费 千4
    uint256 public fee = 4;
    // 一级分红
    // 百分之10
    uint256 public firstRate = 10;
    // 二级分红
    // 百分之5
    uint256 public secondRate = 5;

    mapping(address => uint256) public profitBalances;

    function setRate(uint256 _firstRate, uint256 _secondRate) public onlyOwner {
        firstRate = _firstRate;
        secondRate = _secondRate;
    }

    function setIntroduce(address _introduce) public onlyOwner {
        introduce = Introduce(_introduce);
    }
    // A 用户自己注册为邀请人，并swap
    function swap(address introducer, uint256 amonut) public {
        if (introduce.indexes(introducer) == 0) {
            introduce.addIntroducer(introducer);
        }

        // todo swap

        calculateDividends(introducer, amonut);
    }

    // B 用户被 A 邀请，并swap,为A用户的index，B用户的地址
    function swap(uint256 index, address introducer, uint256 amonut) public {
        if (introduce.indexes(introducer) == 0) {
            introduce.addIntroducer(index, introducer);
        }
        // todo swap

        calculateDividends(introducer, amonut);
    }

    function calculateDividends(address introducer, uint256 amonut) private {
        uint256 profit = (amonut * fee) / 1000;

        (address first, address second) = introduce.getFirstAndSecondIntroducer(introducer);

        if (first != address(0)) {
            uint256 firstProfit = (profit * firstRate) / 100;
            profitBalances[first] += firstProfit;
        }

        if (second != address(0)) {
            uint256 secondProfit = (profit * secondRate) / 100;
            profitBalances[second] += secondProfit;
        }
    }
}
