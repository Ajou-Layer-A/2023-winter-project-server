// SPDX-License-Identifier: MIT
pragma solidity ^0.4.17;

interface INFTLootBox {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Mint(address indexed to, string tokenURI);
    event Burn(uint256 indexed tokenId);    

    function mint(address to, string tokenURI) external returns (uint256);
    function getTokenURI(uint256 tokenId) external view returns (string memory);
    function transfer(address to, uint256 tokenId) external;
    function burn(uint256 tokenId) external;
    function getOwnedTokens(address owner) external view returns (uint256[] memory);
}