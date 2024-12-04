"use client";

import React, { useState } from "react";
import { mintWeatherNFT } from "@/lib/contract";
import { isAddress } from "ethers"; // Importar isAddress directamente

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
        setError(null); // Limpiar errores al cambiar
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validaciones
        if (!formData.to || !isAddress(formData.to)) { // Usa isAddress directamente
            setError("La dirección proporcionada no es válida.");
            return;
        }

        if (!formData.image || !formData.image.startsWith("http")) {
            setError("La URL de la imagen debe ser válida (debe comenzar con 'http').");
            return;
        }

        try {
            if (!window.ethereum) {
                alert("MetaMask no está instalado.");
                return;
            }

            // Solicita la conexión a MetaMask
            await window.ethereum.request({ method: "eth_requestAccounts" });

            // Llama a la función de minteo
            await mintWeatherNFT(
                formData.to,
                formData.name,
                formData.description,
                formData.image,
                formData.humidity,
                formData.windSpeed
            );

            alert("NFT minteado con éxito!");
            console.log("Datos del formulario:", formData);
            setFormData({
                to: "",
                name: "",
                description: "",
                image: "",
                humidity: 0,
                windSpeed: 0,
            });
        } catch (error) {
            console.error("Error al mintear el NFT:", error);
            setError("Hubo un error al mintear el NFT. Revisa la consola para más detalles.");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Mintear un NFT del Clima</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Dirección del receptor:</label>
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
                    <label className="block font-medium">Nombre:</label>
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
                    <label className="block font-medium">Descripción:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">URL de la imagen:</label>
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
                    <label className="block font-medium">Humedad:</label>
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
                    <label className="block font-medium">Velocidad del viento:</label>
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
                    Mintear NFT
                </button>
            </form>
        </div>
    );
}
