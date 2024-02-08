// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SendEther is Ownable(msg.sender), AccessControl {
    bytes32 public constant TRANSFER_ROLE = keccak256("TRANSFER_ROLE");

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(TRANSFER_ROLE, msg.sender);
    }

    modifier onlyTransferRole() {
        require(hasRole(TRANSFER_ROLE, msg.sender), "Not authorized to transfer");
        _;
    }

    function grantTransferRole(address account) external onlyOwner {
        grantRole(TRANSFER_ROLE, account);
    }

    function revokeTransferRole(address account) external onlyOwner {
        revokeRole(TRANSFER_ROLE, account);
    }

    function sendEther(address payable to) external payable  onlyTransferRole {
        require(msg.sender.balance >= msg.value);
        (bool sent, ) = to.call{value: msg.value , gas:1000}("");
        require(sent, "Failed to send Ether");
    }

    function getBalance() external view returns (uint256) {
        return address(msg.sender).balance;
    }
}
