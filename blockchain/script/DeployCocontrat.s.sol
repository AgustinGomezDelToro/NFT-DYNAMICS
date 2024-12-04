// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/cocontrat.sol";

contract DeployWeather is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        Weather weatherNFT = new Weather();

        console.log("WeatherNFT deployed at:", address(weatherNFT));

        vm.stopBroadcast();
    }
}
