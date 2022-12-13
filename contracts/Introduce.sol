// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Introduce is Ownable {
    address public swap;

    function setSwap(address _swap) public onlyOwner {
        swap = _swap;
    }

    modifier onlySwap() {
        require(msg.sender == swap, "Introduce: caller is not the swap");
        _;
    }

    // 推介者
    address[] public introducers;
    mapping(address => uint256) public indexes;

    // 被推介者 => 推介者Index
    mapping(address => uint256) public introducerIndexes;

    function addIntroducer(address introducer) public onlySwap returns (bool) {
        return _addIntroducer(introducer);
    }

    // A = 1
    // index = 1, introduce = B
    // B = 2
    // introducerIndexes[B] = 1
    // index = 2, introduce = C
    // C = 3
    // introducerIndexes[C] = 2

    function addIntroducer(uint256 index, address introduce) public onlySwap {
        // 已经注册过的不允许再注册
        if (_addIntroducer(introduce)) {
            // index 大于 introducers.length 时，index = introducers.length
            if (index > introducers.length) {
                index = introducers.length;
            }
            introducerIndexes[introduce] = index;
        }
    }

    // 获取第一级推介者和第二级推介者
    // A = > B => C
    function getFirstAndSecondIntroducer(address introducer) public view returns (address, address) {
        // 未注册的人没有推介者
        if (indexes[introducer] == 0) {
            return (address(0), address(0));
        }
        // introducer = A ,return (0, 0)
        uint256 index = introducerIndexes[introducer];
        if (index == 0) {
            return (address(0), address(0));
        }
        // introducer = B, return (A, 0)
        address first = introducers[index - 1];
        index = introducerIndexes[first];
        if (index == 0) {
            return (first, address(0));
        }

        // introducer = C, return (A, B)
        address second = introducers[index - 1];
        return (second, first);
    }

    // 从1开始
    function _addIntroducer(address introducer) private returns (bool) {
        if (indexes[introducer] != 0) {
            return false;
        }
        introducers.push(introducer);
        indexes[introducer] = introducers.length;
        return true;
    }
}
