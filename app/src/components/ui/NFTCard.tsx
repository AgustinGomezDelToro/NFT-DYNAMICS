"use client";

import React from "react";
import { NFT } from "@/types/NFT";

interface NFTCardProps {
    nft: NFT;
    onUpdate: (id: number) => void;
}

export function NFTCard({ nft, onUpdate }: NFTCardProps) {
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
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => onUpdate(nft.tokenId)}
            >
                Update
            </button>
        </div>
    );
}
