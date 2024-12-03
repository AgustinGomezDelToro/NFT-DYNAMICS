// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/WeatherNFT.sol";

contract DeployWeatherNFT is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address ownerAddress = vm.envAddress("OWNER_ADDRESS");

        vm.startBroadcast(deployerPrivateKey);

        WeatherNFT weatherNFT = new WeatherNFT(ownerAddress);

        console.log("WeatherNFT deployed at:", address(weatherNFT));

        vm.stopBroadcast();
    }
}
