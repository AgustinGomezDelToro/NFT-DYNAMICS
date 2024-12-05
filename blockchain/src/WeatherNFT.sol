// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WeatherNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    struct WeatherData {
        string name;
        string description;
        string image;
        uint256 humidity;
        uint256 windSpeed;
    }

    mapping(uint256 => WeatherData) public weatherData;

    constructor(address initialOwner) ERC721("WeatherNFT", "WNFT") Ownable(initialOwner) {
        transferOwnership(initialOwner); // Assign initial owner
        tokenCounter = 1; // Start the token counter at 1
    }

    function mintWeatherNFT(
        address to,
        string memory name,
        string memory description,
        string memory image,
        uint256 humidity,
        uint256 windSpeed
    ) public onlyOwner {
        uint256 newTokenId = tokenCounter;

        // Mint the NFT
        _safeMint(to, newTokenId);

        // Store the weather metadata
        weatherData[newTokenId] = WeatherData(name, description, image, humidity, windSpeed);

        // Dynamically generate the token URI
        string memory uri = generateTokenURI(name, description, image, humidity, windSpeed);
        _setTokenURI(newTokenId, uri);

        tokenCounter++; // Increment the token counter
    }

    function updateWeatherData(
        uint256 tokenId,
        string memory name,
        string memory description,
        string memory image,
        uint256 humidity,
        uint256 windSpeed
    ) public {
        require(ownerOf(tokenId) != address(0), "Token does not exist");

        // Update the weather metadata
        weatherData[tokenId] = WeatherData(name, description, image, humidity, windSpeed);

        // Regenerate the token URI
        string memory uri = generateTokenURI(name, description, image, humidity, windSpeed);
        _setTokenURI(tokenId, uri);
    }

    function getWeatherData(uint256 tokenId)
    public
    view
    returns (
        string memory,
        string memory,
        string memory,
        uint256,
        uint256
    )
    {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        WeatherData memory data = weatherData[tokenId];
        return (data.name, data.description, data.image, data.humidity, data.windSpeed);
    }

    function generateTokenURI(
        string memory name,
        string memory description,
        string memory image,
        uint256 humidity,
        uint256 windSpeed
    ) public pure returns (string memory) {
        return
            string(
            abi.encodePacked(
                '{"name":"', name,
                '", "description":"', description,
                '", "image":"', image,
                '", "attributes":[{"trait_type":"Humidity","value":', uint2str(humidity),
                '},{"trait_type":"Wind Speed","value":', uint2str(windSpeed), '}]}'
            )
        );
    }

    function uint2str(uint256 _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}
