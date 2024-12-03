// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WeatherNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    struct WeatherData {
        string name;         // Ciudad
        string description;  // Clima (soleado, nublado, lluvioso)
        string image;        // URL de la imagen
        uint256 humidity;    // Humedad
        uint256 windSpeed;   // Velocidad del viento
    }

    mapping(uint256 => WeatherData) public weatherData;

    constructor(address initialOwner) ERC721("WeatherNFT", "WNFT") Ownable(initialOwner) {
        transferOwnership(initialOwner); // Asigna el propietario inicial
        tokenCounter = 1; // Inicia el contador en 1
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

        // Mint el NFT
        _safeMint(to, newTokenId);

        // Almacena los metadatos del clima
        weatherData[newTokenId] = WeatherData(name, description, image, humidity, windSpeed);

        // Genera dinámicamente la URI del token
        string memory uri = generateTokenURI(name, description, image, humidity, windSpeed);
        _setTokenURI(newTokenId, uri);

        tokenCounter++; // Incrementa manualmente el contador del token
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
    ) public pure returns (string memory) { // pasar a internar post TEST
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

    // Función opcional para devolver una URI base
    function _baseURI() internal view virtual override returns (string memory) {
        return "https://example-base-uri.com/";
    }
}
