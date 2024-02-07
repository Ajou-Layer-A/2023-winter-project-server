// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTLootBox is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;

    mapping(address => uint256[]) private _ownedTokens;

    constructor() ERC721("Layer-A-winter-dev-study", "Layer-A") Ownable(msg.sender) {}

    //mint: create a new token
    // mint는 본인이 만약 주소를 잘못 적었을 경우에는 NFT가 소각될 수 있음.
    function mint(address to, string memory tokenURI) public returns (uint256) {
        _tokenIds++;
        _mint(to, _tokenIds);
        _setTokenURI(_tokenIds, tokenURI);
        return _tokenIds;
    }

    // 토큰 URT 반환
    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    // 만약 받는 사람이 NFT를 받을 수 없는 계정이라면 NFT가 소각됨. TransferFrom을 사용하면 예방가능.
    function transfer(address to, uint256 tokenId) public {
        safeTransferFrom(msg.sender, to, tokenId);
    }

    // NFT 소각
    function burn(uint256 tokenId) public {
        _burn(tokenId);
    }

    // mypage를 위해서 본인이 가진 NFT 토큰 ID 반환
    function getOwnedTokens(address owner) public view returns (uint256[] memory) {
        return _ownedTokens[owner];
    }

    // NFT 구매로직
    // 마켓에 NFT 등록: 제 3자에게 권한 부여(서버 지갑에 사용자 NFT 권한 등록)

    // NFT 판매 완료 시: 수수료 부과(NFT 구매 시 일정 수수료 서버 지갑으로 전송, 나머지는 NFT 소유자에게 전송)

    // 제 3자가 NFT 전송(서버 지갑이 구매자에게 NFT 전송)
    
}