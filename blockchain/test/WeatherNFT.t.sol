// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Test.sol";
import "../src/WeatherNFT.sol";

contract WeatherNFTTest is Test {
    WeatherNFT public weatherNFT;

    address public owner = address(0x123);

    function setUp() public {
        weatherNFT = new WeatherNFT(owner);
    }

    function testInitialSetup() public {
        assertEq(weatherNFT.owner(), owner, "Owner is incorrect");
        assertEq(weatherNFT.tokenCounter(), 1, "Token counter should start at 1");
    }

    function testMintWeatherNFT() public {
        vm.prank(owner);

        weatherNFT.mintWeatherNFT(
            address(this),
            "New York",
            "Sunny",
            "https://example.com/image.png",
            50,
            10
        );

        (string memory name, string memory description, string memory image, uint256 humidity, uint256 windSpeed) =
                            weatherNFT.getWeatherData(1);

        assertEq(name, "New York", "Name is incorrect");
        assertEq(description, "Sunny", "Description is incorrect");
        assertEq(image, "https://example.com/image.png", "Image URL is incorrect");
        assertEq(humidity, 50, "Humidity is incorrect");
        assertEq(windSpeed, 10, "Wind speed is incorrect");
    }

    function testGenerateTokenURI() public {
        TestWeatherNFT testWeatherNFT = new TestWeatherNFT(owner);

        string memory generatedURI = testWeatherNFT.testGenerateTokenURI(
            "New York",
            "Sunny",
            "https://example.com/image.png",
            50,
            10
        );

        string memory expectedURI = '{"name":"New York", "description":"Sunny", "image":"https://example.com/image.png", "attributes":[{"trait_type":"Humidity","value":50},{"trait_type":"Wind Speed","value":10}]}';
        assertEq(generatedURI, expectedURI, "Generated URI is incorrect");
    }


    function testMintWeatherNFTRevertIfNotOwner() public {
        vm.expectRevert("Ownable: caller is not the owner");

        weatherNFT.mintWeatherNFT(
            address(this),
            "Los Angeles",
            "Cloudy",
            "https://example.com/cloudy.png",
            70,
            15
        );
    }

    function testTransferOwnership() public {
        address newOwner = address(0x456);
        vm.prank(owner);
        weatherNFT.transferOwnership(newOwner);

        assertEq(weatherNFT.owner(), newOwner, "Ownership was not transferred correctly");
    }

    function testGetWeatherDataRevertIfTokenDoesNotExist() public {
        vm.expectRevert("Token does not exist");

        weatherNFT.getWeatherData(999);
    }

    function testBaseURI() public {
        string memory baseURI = weatherNFT._baseURI();
        assertEq(baseURI, "https://example-base-uri.com/", "Base URI is incorrect");
    }
}
