// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/WeatherNFT.sol";

contract WeatherNFTTest is Test {
    WeatherNFT public weatherNFT;

    function setUp() public {
        // Desplegar el contrato
        weatherNFT = new WeatherNFT();
    }

    function testDeployment() public {
        // Verificar que el contrato se despliega correctamente
        assertEq(address(weatherNFT).code.length > 0, true, "Contract not deployed correctly");
    }

    function testMintNFTWithWeatherData() public {
        string memory tokenURI = "ipfs://test-uri";
        int256 temperature = 25; // 25°C
        uint256 humidity = 80;  // 80%
        uint256 windSpeed = 15; // 15 km/h
        string memory weatherImage = "ipfs://weather-image";

        uint256 tokenId = weatherNFT.mintNFT(tokenURI, temperature, humidity, windSpeed, weatherImage);

        // Verificar datos meteorológicos almacenados
        WeatherNFT.WeatherData memory data = weatherNFT.getWeatherData(tokenId);

        assertEq(data.temperature, temperature);
        assertEq(data.humidity, humidity);
        assertEq(data.windSpeed, windSpeed);
        assertEq(data.weatherImage, weatherImage);
    }

    function testUpdateWeatherData() public {
        string memory tokenURI = "ipfs://test-uri";
        int256 initialTemperature = 25;
        uint256 initialHumidity = 80;
        uint256 initialWindSpeed = 15;
        string memory initialWeatherImage = "ipfs://weather-image";

        uint256 tokenId = weatherNFT.mintNFT(tokenURI, initialTemperature, initialHumidity, initialWindSpeed, initialWeatherImage);

        // Nuevos datos
        int256 newTemperature = 30;
        uint256 newHumidity = 70;
        uint256 newWindSpeed = 20;
        string memory newWeatherImage = "ipfs://new-weather-image";

        // Actualizar los datos
        weatherNFT.updateWeatherData(tokenId, newTemperature, newHumidity, newWindSpeed, newWeatherImage);

        // Verificar actualización
        WeatherNFT.WeatherData memory updatedData = weatherNFT.getWeatherData(tokenId);

        assertEq(updatedData.temperature, newTemperature);
        assertEq(updatedData.humidity, newHumidity);
        assertEq(updatedData.windSpeed, newWindSpeed);
        assertEq(updatedData.weatherImage, newWeatherImage);
    }
}
