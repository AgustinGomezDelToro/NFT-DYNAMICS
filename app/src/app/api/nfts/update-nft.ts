import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RCP);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

const contractAddress = "0xE62ae127015A59b02Fb609575D12d17Be3E57e5F";
const contractABI = [
    {
        "inputs": [
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
            { "internalType": "string", "name": "name", "type": "string" },
            { "internalType": "string", "name": "description", "type": "string" },
            { "internalType": "string", "name": "image", "type": "string" },
            { "internalType": "uint256", "name": "humidity", "type": "uint256" },
            { "internalType": "uint256", "name": "windSpeed", "type": "uint256" }
        ],
        "name": "updateWeatherData",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const contract = new ethers.Contract(contractAddress, contractABI, signer);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { tokenId, name, description, image, humidity, windSpeed } = req.body;

    if (!tokenId || !name || !description || !image || humidity === undefined || windSpeed === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const tx = await contract.updateWeatherData(tokenId, name, description, image, humidity, windSpeed);
        await tx.wait();
        console.log(`NFT ${tokenId} updated successfully with tx: ${tx.hash}`);
        res.status(200).json({ message: "NFT updated successfully", txHash: tx.hash });
    } catch (error) {
        console.error("Error updating NFT:", error);
        res.status(500).json({ error: "Error updating NFT", details: error });
    }
}
