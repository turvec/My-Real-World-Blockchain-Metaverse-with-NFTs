// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Land is ERC721 {

    uint public cost = 1 ether;
    uint public maxSupply = 10;
    uint public totalSupply = 0;

    struct Building {
        string name;
        address owner;
        uint256 width;
        uint256 height;
        uint256 depth;
        int256 posX;
        int256 posY;
        int256 posZ;
    }

    Building[] public buildings;

    constructor(string memory _name, string memory _symbol, uint256 _cost ) ERC721 (_name, _symbol) {
        cost = _cost;
        buildings.push(
            Building('Bank', address(0x0), 2, 6, 4, 0, 0, 0)
        );
         buildings.push(
            Building('University', address(0x0), 4, 10, 8, 10, -18, 0)
        );
         buildings.push(
            Building('Central Hospital', address(0x0), 2, 12, 4, 10, 16, 0)
        );
         buildings.push(
            Building('fun park', address(0x0), 6, 4, 4, 20, 2, 0)
        );
        buildings.push(
            Building('Art Gallery', address(0x0), 4, 6, 2, -18, -12, 0)
        );
        buildings.push(
            Building('Beach City', address(0x0), 10, 6, 6, -4, -9, 0)
        );
        buildings.push(
            Building('Food Heaven', address(0x0), 4, 10, 4, -20, 15, 0)
        );
        buildings.push(
            Building('Industrial Refinary', address(0x0), 4, 12, 2, -19, 0, 0)
        );
        buildings.push(
            Building('State Musuem', address(0x0), 8, 4, 8, 9, 3, 0)
        );
        buildings.push(
            Building('Center Mall', address(0x0), 6, 6, 6, -4, 11, 0)
        );
    }

    function mint( uint256 _id) public payable {
        uint256 supply = totalSupply;
        require(supply <= maxSupply);
        require(buildings[_id - 1].owner == address(0x0) );
        require(msg.value >= cost);

        buildings[_id - 1].owner = msg.sender;
        totalSupply += 1;
        _safeMint(msg.sender, _id);
    }

    function transferFrom(address from, address to, uint256 tokenId) public override {
        require(_isApprovedOrOwner( _msgSender(), tokenId ) ," ERC721: transfer caller is not owner nor approved ");

        buildings[tokenId - 1].owner = to;
        _transfer(from, to, tokenId);
        
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public override {
        require(_isApprovedOrOwner( _msgSender(), tokenId ) ," ERC721: transfer caller is not owner nor approved ");

        buildings[tokenId - 1].owner = to;
        _safeTransfer(from, to, tokenId, _data);
        
    }

    function getBuildings() public view returns(Building[] memory) {
        return buildings;
    }

    function getBuilding(uint _id) public view returns(Building memory) {
        return buildings[_id - 1];
    }

}