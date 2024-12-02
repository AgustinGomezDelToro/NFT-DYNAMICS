// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract WeatherNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    struct WeatherData {
        int256 temperature; // en grados Celsius
        uint256 humidity;   // en porcentaje
        uint256 windSpeed;  // en km/h
        string weatherImage; // URL de la imagen
    }

    mapping(uint256 => WeatherData) public weatherData;

    constructor() ERC721("WeatherNFT", "WNFT") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function mintNFT(
        string memory tokenURI,
        int256 temperature,
        uint256 humidity,
        uint256 windSpeed,
        string memory weatherImage
    ) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        weatherData[newTokenId] = WeatherData(
            temperature,
            humidity,
            windSpeed,
            weatherImage
        );

        tokenCounter++;
        return newTokenId;
    }

    function getWeatherData(uint256 tokenId) public view returns (WeatherData memory) {
        require(_exists(tokenId), "Token does not exist");
        return weatherData[tokenId];
    }

    function updateWeatherData(
        uint256 tokenId,
        int256 temperature,
        uint256 humidity,
        uint256 windSpeed,
        string memory weatherImage
    ) public onlyOwner {
        require(_exists(tokenId), "Token does not exist");

        weatherData[tokenId] = WeatherData(
            temperature,
            humidity,
            windSpeed,
            weatherImage
        );
    }

    // Sobrescribir funciones de ERC721 y ERC721URIStorage
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
