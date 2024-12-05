"use client";

import React, { useState, useEffect } from "react";
import { mintWeatherNFT, updateWeatherNFT } from "@/lib/contract";

const cityData = [
    {
        name: "PARIS",
        description: "Sunny",
        image: "https://josevicentediaz.files.wordpress.com/2021/06/pexels-photo-301599.jpeg",
    },
    {
        name: "ROSARIO",
        description: "Rainy",
        image: "https://humanidades.com/wp-content/uploads/2018/10/lluvia-3-e1581819535291.jpg",
    },
    {
        name: "VALENCIA",
        description: "Cloudy",
        image: "https://huracansinpeligro.com/wp-content/uploads/2020/10/Qu%C3%A9-son-las-nubes-_-Descubre-sus-clases-1024x612.jpg",
    },
];

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
    const [autoUpdateEnabled, setAutoUpdateEnabled] = useState<boolean>(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "humidity" || name === "windSpeed" ? parseInt(value) : value,
        });
        console.log(`Updated form field: ${name}, Value: ${value}`);
        setError(null);
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        console.log("Submit form initiated.");

        if (!window.ethereum) {
            alert("MetaMask is not installed.");
            console.error("MetaMask is not installed.");
            return;
        }

        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("MetaMask account connected.");

        try {
            console.log("Minting NFT with data:", formData);
            await mintWeatherNFT(
                formData.to,
                formData.name,
                formData.description,
                formData.image,
                formData.humidity,
                formData.windSpeed
            );
            alert("NFT minted successfully!");
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

    const handleCustomMint = async (cityIndex: number) => {
        console.log(`Custom mint for city index: ${cityIndex}`);
        try {
            if (!window.ethereum) {
                alert("MetaMask is not installed.");
                console.error("MetaMask is not installed.");
                return;
            }

            await window.ethereum.request({ method: "eth_requestAccounts" });
            console.log("MetaMask account connected for custom mint.");

            const city = cityData[cityIndex];
            const randomHumidity = Math.floor(Math.random() * 100);
            const randomWindSpeed = Math.floor(Math.random() * 50);

            console.log(`Minting NFT for ${city.name} with random data. Humidity: ${randomHumidity}, Wind Speed: ${randomWindSpeed}`);
            await mintWeatherNFT(
                "0x351024A4EC50612C8D1CF70cd508F77f37Da53F8", // Dirección válida
                city.name,
                city.description,
                city.image,
                randomHumidity,
                randomWindSpeed
            );
            alert(`NFT for ${city.name} minted successfully!`);
        } catch (error) {
            console.error(`Error minting NFT for ${cityData[cityIndex].name}:`, error);
        }
    };

    const handleAutoUpdateNFTs = async () => {
        console.log("Starting auto-update for NFTs.");
        try {
            if (!window.ethereum) {
                console.error("MetaMask is not installed.");
                return;
            }

            await window.ethereum.request({ method: "eth_requestAccounts" });
            console.log("MetaMask account connected for auto-update.");

            for (let i = 0; i < cityData.length; i++) {
                const randomHumidity = Math.floor(Math.random() * 100);
                const randomWindSpeed = Math.floor(Math.random() * 50);

                const city = cityData[i];

                console.log(`Updating NFT for ${city.name} with random data. Humidity: ${randomHumidity}, Wind Speed: ${randomWindSpeed}`);
                await updateWeatherNFT(
                    i + 1, // Suponiendo que tokenId corresponde al índice + 1
                    city.name,
                    city.description,
                    city.image,
                    randomHumidity,
                    randomWindSpeed
                );

                console.log(`NFT for ${city.name} updated successfully.`);
            }
        } catch (error) {
            console.error("Error updating NFTs automatically:", error);
        }
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (autoUpdateEnabled) {
            console.log("Auto-update enabled. Setting interval for updates.");
            interval = setInterval(() => {
                console.log("Auto-update triggered.");
                handleAutoUpdateNFTs();
            }, 60000); // Actualiza cada minuto
        }

        return () => {
            if (interval) {
                clearInterval(interval);
                console.log("Auto-update interval cleared.");
            }
        };
    }, [autoUpdateEnabled]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Mint and Update Weather NFTs</h1>
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
                    Mint Custom NFT
                </button>
            </form>
            <div className="mt-4 space-y-2">
                {cityData.map((city, index) => (
                    <button
                        key={index}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={() => handleCustomMint(index)}
                    >
                        Mint {city.name} NFT
                    </button>
                ))}
            </div>
            <div className="mt-4">
                <button
                    className={`px-4 py-2 rounded ${
                        autoUpdateEnabled ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                    onClick={() => setAutoUpdateEnabled(!autoUpdateEnabled)}
                >
                    {autoUpdateEnabled ? "Stop Auto Update" : "Start Auto Update"}
                </button>
                <p className="text-gray-600 mt-2">
                    {autoUpdateEnabled
                        ? "Automatic NFT updates are enabled."
                        : "Automatic NFT updates are disabled."}
                </p>
            </div>
        </div>
    );
}
