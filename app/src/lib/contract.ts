import { ethers } from "ethers";
import WeatherNFT from "@/abis/WeatherNFT.json"; // ABI del contrato
import { NFT } from "@/types/NFT"; // Interfaz para los NFTs

// ABI y dirección del contrato
const WeatherNFTAbi = WeatherNFT.abi;
const contractAddress = "0xAD28F300ea0E8e531ecf1967d2C64bd588724A57";
const AVALANCHE_RPC_URL = "https://avalanche-fuji.infura.io/v3/9eb78f13dc39478f8dc68f8ac3a571da";

// Proveedor para leer desde la blockchain
export const getProvider = () => new ethers.JsonRpcProvider(AVALANCHE_RPC_URL);

// Contrato conectado con firma para escribir (mintear NFTs)
export const getContract = async () => {
    if (!window.ethereum) {
        throw new Error("MetaMask is not installed.");
    }
    const provider = new ethers.BrowserProvider(window.ethereum as any);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, WeatherNFTAbi, signer);
};

// Función para recuperar los NFTs minteados
export const getMintedNFTs = async (): Promise<NFT[]> => {
    try {
        const provider = getProvider();
        const contract = new ethers.Contract(contractAddress, WeatherNFTAbi, provider);

        const tokenCounter = await contract.tokenCounter();
        // Asegúrate de manejar cualquier tipo de retorno (BigInt, string, number)
        const totalTokens = typeof tokenCounter === "bigint"
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
    windSpeed: number
) => {
    try {
        const contract = await getContract();
        const tx = await contract.mintWeatherNFT(to, name, description, image, humidity, windSpeed);
        await tx.wait();
        console.log(`NFT minteado con éxito: ${tx.hash}`);
    } catch (error) {
        console.error("Error al mintear el NFT:", error);
        throw error;
    }
};
