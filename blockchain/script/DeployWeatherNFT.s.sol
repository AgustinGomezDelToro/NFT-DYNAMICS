// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/WeatherNFT.sol";

contract DeployWeatherNFT is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY"); // Lee la clave privada
        vm.startBroadcast(deployerPrivateKey); // Inicia la transmisión de transacciones

        // Despliega el contrato
        WeatherNFT weatherNFT = new WeatherNFT();

        console.log("WeatherNFT deployed at:", address(weatherNFT));

        vm.stopBroadcast(); // Finaliza la transmisión
    }
}
