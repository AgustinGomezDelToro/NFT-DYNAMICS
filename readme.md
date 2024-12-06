
# NFT-DYNAMICS

## PROD
### https://nft-dynamics-deploy.vercel.app/


## Deploy details
#### address of Contract: https://testnet.snowtrace.io/address/0x744a71168b4968Eaf642241F491Fb9cD7CDb80bA
#### https://testnet.snowtrace.io/token/0x744a71168b4968Eaf642241F491Fb9cD7CDb80bA?chainid=43113
#### Block: 37007890
#### Transac : https://testnet.snowtrace.io/tx/0xe09788458a3b4178b326a0f7a5d34bdfbb181b97d668477f07395f78b32e7632

## App Overview
The WeatherNFT app allows users to interact with dynamic NFTs representing weather data. Each NFT contains the following information:

- City Name
- Weather Description (e.g., sunny, cloudy, rainy)
- Image URL
- Humidity
- Wind Speed
- Temperature

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
