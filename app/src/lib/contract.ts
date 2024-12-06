import { ethers } from "ethers";
import WeatherNFT from "@/abis/WeatherNFT.json";
import { NFT } from "@/types/NFT";

// ABI y dirección del contrato
const WeatherNFTAbi = WeatherNFT.abi;
const contractAddress = "0x744a71168b4968Eaf642241F491Fb9cD7CDb80bA";
const AVALANCHE_RPC_URL = "https://avalanche-fuji.infura.io/v3/9eb78f13dc39478f8dc68f8ac3a571da";

// Proveedor para leer desde la blockchain
export const getProvider = (): ethers.JsonRpcProvider => {
    return new ethers.JsonRpcProvider(AVALANCHE_RPC_URL);
};

// Contrato conectado con firma para escribir (mintear NFTs)
export const getContract = async (): Promise<ethers.Contract> => {
    if (!window.ethereum) {
        throw new Error("MetaMask is not installed.");
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, WeatherNFTAbi, signer);
};

// Función para recuperar los NFTs minteados
export const getMintedNFTs = async (): Promise<NFT[]> => {
    try {
        const provider = getProvider();
        const contract = new ethers.Contract(contractAddress, WeatherNFTAbi, provider);

        const tokenCounter = await contract.tokenCounter();
        const totalTokens =
            typeof tokenCounter === "bigint"
                ? Number(tokenCounter) - 1
                : typeof tokenCounter === "number"
                    ? tokenCounter - 1
                    : parseInt(tokenCounter) - 1;

        if (totalTokens <= 0) {
            return [];
        }

        const nfts = await Promise.all(
            Array.from({ length: totalTokens }, (_, i) => i + 1).map(async (tokenId) => {
                try {
                    const nftData = await contract.getWeatherData(tokenId);
                    return {
                        tokenId,
                        name: nftData[0],
                        description: nftData[1],
                        image: nftData[2] || "https://via.placeholder.com/150",
                        humidity: Number(nftData[3]),
                        windSpeed: Number(nftData[4]),
                        temperature: Number(nftData[5]),
                    };
                } catch (err) {
                    console.error(`Error fetching NFT with ID: ${tokenId}`, err);
                    return null;
                }
            })
        );

        return nfts.filter(Boolean) as NFT[];
    } catch (error) {
        console.error("Error fetching minted NFTs:", error);
        throw new Error("Failed to fetch NFTs.");
    }
};

// Función para mintear un NFT
export const mintWeatherNFT = async (
    to: string,
    name: string,
    description: string,
    image: string,
    humidity: number,
    windSpeed: number,
    temperature: number
): Promise<ethers.ContractTransaction> => {
    try {
        const contract = await getContract();
        const tx = await contract.mintWeatherNFT(
            to,
            name,
            description,
            image,
            humidity,
            windSpeed,
            temperature
        );
        console.log(`Transaction sent: ${tx.hash}`);
        return tx; // Retornar la transacción para que pueda manejarse externamente
    } catch (error) {
        console.error("Error al mintear el NFT:", error);
        throw error;
    }
};

// Función para actualizar un NFT
export const updateWeatherNFT = async (
    tokenId: number,
    name: string,
    description: string,
    image: string,
    humidity: number,
    windSpeed: number,
    temperature: number
): Promise<ethers.ContractTransaction> => {
    try {
        const contract = await getContract();
        const tx = await contract.updateWeatherData(
            tokenId,
            name,
            description,
            image,
            humidity,
            windSpeed,
            temperature
        );
        console.log(`Transaction sent: ${tx.hash}`);
        return tx; // Retornar la transacción para que pueda manejarse externamente
    } catch (error) {
        console.error("Error updating the NFT:", error);
        throw error;
    }
};
