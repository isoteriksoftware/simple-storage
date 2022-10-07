// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract SimpleStorage {
    mapping (address => uint256) private s_store;

    function storeValue(uint256 _value) external {
        s_store[msg.sender] = _value;
    }

    function retrieveValue() public view returns(uint256) {
        return s_store[msg.sender];
    }
}