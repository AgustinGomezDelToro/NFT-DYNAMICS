import { ethers } from "ethers";
import { abi as WeatherNFTAbi } from "@/abis/WeatherNFT.json"; // Usa el ABI correcto

const contractAddress = "0x61F461Ab541bC06a3123dd4d0112F9fFCedb9f00";
const AVALANCHE_RPC_URL = "https://avalanche-fuji.infura.io/v3/9eb78f13dc39478f8dc68f8ac3a571da";

export const getProvider = () => {
    try {
        return new ethers.JsonRpcProvider(AVALANCHE_RPC_URL);
    } catch (error) {
        console.error("Error al crear el proveedor:", error);
        throw error;
    }
};

export const getContract = async () => {
    if (!window.ethereum) {
        alert("MetaMask no está instalado.");
        throw new Error("MetaMask no está instalado");
    }
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    return new ethers.Contract(contractAddress, WeatherNFTAbi, signer);
};
