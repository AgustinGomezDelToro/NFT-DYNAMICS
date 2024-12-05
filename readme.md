
# NFT-DYNAMICS


## Deploy details
#### address of Contract: https://testnet.snowtrace.io/address/0xE62ae127015A59b02Fb609575D12d17Be3E57e5F
#### https://testnet.snowtrace.io/token/0xE62ae127015A59b02Fb609575D12d17Be3E57e5F?chainid=43113
#### Block: 36997025
#### Transac : https://testnet.snowtrace.io/tx/0x41b1681a56f59e7f69dfafdb40a9111e7ad3d9157d1d5560fa239fb5396dc9b4

## App Overview
The WeatherNFT app allows users to interact with dynamic NFTs representing weather data. Each NFT contains the following information:

- City Name
- Weather Description (e.g., sunny, cloudy, rainy)
- Image URL
- Humidity
- Wind Speed

### The app consists of:

- Minting NFTs: The contract owner can mint new Weather NFTs.
- Updating NFTs: Any user can update the weather data of an existing NFT.
- Frontend Components:
- MintNFTForm: Allows the owner to mint NFTs with custom weather data.
- NFTCard: Displays each NFT with an option to update its weather data.

### Updating Weather Data
- The updateWeatherData function is open to any user:

- **Permission**: No restrictions; any wallet can update the data


### Summary
The WeatherNFT app provides a robust and interactive platform for managing weather-related NFTs. The permissions system ensures controlled minting while enabling decentralized updates, creating a balance between security and user interactivity.