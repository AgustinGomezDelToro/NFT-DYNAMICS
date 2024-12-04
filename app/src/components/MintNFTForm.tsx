"use client";

import React, { useState } from "react";
import { mintWeatherNFT } from "@/lib/contract";
import { isAddress } from "ethers";

export default function MintNFTForm() {
    const [formData, setFormData] = useState({
        to: "",
        name: "",
        description: "",
        image: "",
        humidity: 0,
        windSpeed: 0,
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "humidity" || name === "windSpeed" ? parseInt(value) : value,
        });
        setError(null); // Clear errors when changing inputs
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validations
        if (!formData.to || !isAddress(formData.to)) { // Use isAddress directly
            setError("The provided address is invalid.");
            return;
        }

        if (!formData.image || !formData.image.startsWith("http")) {
            setError("The image URL must be valid (must start with 'http').");
            return;
        }

        try {
            if (!window.ethereum) {
                alert("MetaMask is not installed.");
                return;
            }

            // Request MetaMask connection
            await window.ethereum.request({ method: "eth_requestAccounts" });

            // Call the minting function
            await mintWeatherNFT(
                formData.to,
                formData.name,
                formData.description,
                formData.image,
                formData.humidity,
                formData.windSpeed
            );

            alert("NFT minted successfully!");
            console.log("Form data:", formData);
            setFormData({
                to: "",
                name: "",
                description: "",
                image: "",
                humidity: 0,
                windSpeed: 0,
            });
        } catch (error) {
            console.error("Error minting the NFT:", error);
            setError("An error occurred while minting the NFT. Check the console for more details.");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Mint a Weather NFT</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Recipient Address:</label>
                    <input
                        type="text"
                        name="to"
                        value={formData.to}
                        onChange={handleChange}
                        className="w-full border p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Image URL:</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full border p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Humidity:</label>
                    <input
                        type="number"
                        name="humidity"
                        value={formData.humidity}
                        onChange={handleChange}
                        className="w-full border p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Wind Speed:</label>
                    <input
                        type="number"
                        name="windSpeed"
                        value={formData.windSpeed}
                        onChange={handleChange}
                        className="w-full border p-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Mint NFT
                </button>
            </form>
        </div>
    );
}
