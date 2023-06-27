// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract cozNFTs is ERC721URIStorage, Ownable, ERC721Enumerable {
    using Counters for Counters.Counter;

    struct NftTokenData {
        uint256 nftTokenId;
        string nftTokenURI;
    }

    Counters.Counter private _tokenIds;
    
    mapping(uint256 => string) public metadataURIs;

    constructor() ERC721("cozNFT", "NFT"){}



    // @notice 토큰 URI를 저장 
    // @param _tokenId 토큰 아이디
    // @return 메타데이터 URI
    function tokenURI(uint256 _tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return metadataURIs[_tokenId];
    }

    // @notice 민팅
    // @param _tokenURI 토큰 아이디
    // @return 민팅된 토큰의 id
    function mintNFT(string memory _tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        metadataURIs[newItemId] = _tokenURI;

        _mint(msg.sender, newItemId);

        return newItemId;
    }

    // @notice 모든 nft 토큰 리스트 
    // @return 토큰의 id와 메타데이터 URI가 담긴 배열 
    function getAllNftList() public view returns (NftTokenData[] memory) {
        uint256 nftLength = _tokenIds.current();
        NftTokenData[] memory nftTokenData = new NftTokenData[](nftLength);

        for(uint256 i=0; i<nftLength; i++) {
            uint256 nftTokenId = i+1;
            string memory nftTokenURI = tokenURI(nftTokenId);

            nftTokenData[i] = NftTokenData(nftTokenId, nftTokenURI);
        }

        return nftTokenData;
    }

    // @notice 자신이 발행한 토큰 리스트
    // @param _nftTokenOwner 주소
    // @return 발행한 토큰의 id와 메타데이터 URI가 담긴 배열 
    function getNftTokenList(address _nftTokenOwner) public view returns (NftTokenData[] memory) {
        uint256 balanceLength = balanceOf(_nftTokenOwner);  // 발행한 nft 갯수 확인

        NftTokenData[] memory nftTokenData = new NftTokenData[](balanceLength);

        for(uint256 i=0; i<balanceLength; i++) {
            uint256 nftTokenId = tokenOfOwnerByIndex(_nftTokenOwner, i);
            string memory nftTokenURI = tokenURI(nftTokenId);

            nftTokenData[i] = NftTokenData(nftTokenId, nftTokenURI);
        }

        return nftTokenData;
    }

    // @notice 구매 
    // @param _tokenId 구매할 토큰의 아이디
    function buyNftToken(uint256 _tokenId, uint256 _price) public payable {
        address nftTokenOwner = ownerOf(_tokenId);

        require(_price > 0, "nft token not sale.");
        require(_price  <= msg.value, "caller sent lower than price.");
        require(nftTokenOwner != msg.sender,"caller is nft token owner.");
        require(isApprovedForAll(nftTokenOwner, address(this)), "nft token owner did not approve token.");

        payable(nftTokenOwner).transfer(msg.value);
        IERC721(address(this)).safeTransferFrom(nftTokenOwner, msg.sender, _tokenId);
    }

    // @notice `tokenId`를 소각
    // @param tokenId 소각할 토큰 아이디
    // @dev 발신자가 토큰을 조작할 수 있는 권한이 있는지 확인하지 않는 내부 함수, 사용시 주의 필요
    function _burn(
        uint256 tokenId
    ) internal
      override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }



    // @notice 토큰 전송 전에 호출되는 개발 훅
    // @param from 보내는 주소
    // @param to 받는 주소
    // @param tokenId 토큰 아이디
    // @param batchSize ?
    // @dev batchSize 파라미터를 추가해서 오류 해결함 
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal
      override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}