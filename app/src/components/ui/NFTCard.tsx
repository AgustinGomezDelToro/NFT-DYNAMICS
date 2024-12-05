"use client";

import React, { useState } from "react";
import { updateWeatherNFT } from "@/lib/contract";
import { NFT } from "@/types/NFT";

interface NFTCardProps {
    nft: NFT;
    onUpdate: (updatedNFT: NFT) => void; // Actualizar el estado en el componente padre
}

export function NFTCard({ nft, onUpdate }: NFTCardProps) {
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        setLoading(true);

        try {
            if (!window.ethereum) {
                alert("MetaMask is not installed.");
                console.error("MetaMask is not installed.");
                setLoading(false);
                return;
            }

            await window.ethereum.request({ method: "eth_requestAccounts" });
            console.log("MetaMask account connected for update.");

            // Generar valores aleatorios para la actualización
            const randomHumidity = Math.floor(Math.random() * 100);
            const randomWindSpeed = Math.floor(Math.random() * 50);

            // Enviar transacción para actualizar el NFT
            console.log(
                `Updating NFT ${nft.name} (Token ID: ${nft.tokenId}) with new values: Humidity: ${randomHumidity}, Wind Speed: ${randomWindSpeed}`
            );

            await updateWeatherNFT(
                nft.tokenId,
                nft.name,
                nft.description,
                nft.image,
                randomHumidity,
                randomWindSpeed
            );

            // Actualizar el estado del NFT en el componente padre
            onUpdate({
                ...nft,
                humidity: randomHumidity,
                windSpeed: randomWindSpeed,
            });

            alert(`NFT ${nft.name} updated successfully!`);
        } catch (error) {
            console.error(`Error updating NFT ${nft.name}:`, error);
            alert(`Failed to update NFT ${nft.name}. Check the console for details.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white border rounded-lg shadow-lg p-4">
            <img
                src={nft.image || "https://via.placeholder.com/150"}
                alt={nft.name}
                className="w-full h-40 object-cover mb-4 rounded-md"
            />
            <h2 className="text-lg font-bold">{nft.name}</h2>
            <p className="text-sm text-gray-600">{nft.description}</p>
            <p className="mt-2 text-sm">
                <strong>Humidity:</strong> {nft.humidity}%
            </p>
            <p className="text-sm">
                <strong>Wind Speed:</strong> {nft.windSpeed} km/h
            </p>
            <button
                className={`mt-4 px-4 py-2 rounded ${
                    loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
                onClick={handleUpdate}
                disabled={loading}
            >
                {loading ? "Updating..." : "Update"}
            </button>
        </div>
    );
}
