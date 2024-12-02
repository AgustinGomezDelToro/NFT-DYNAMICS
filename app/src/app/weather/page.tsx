"use client";

import React, { useEffect, useState } from "react";
import { NFTCard } from "../../components/ui/NFTCard";

interface NFT {
    id: number;
    name: string;
    description: string;
    image: string;
}

export default function WeatherPage() {
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNFTs = async () => {
            try {
                const response = await fetch("/api/nfts");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setNfts(data);
            } catch (error) {
                setError("Failed to fetch NFTs. Please try again later.");
                console.error("Error fetching NFTs:", error);
            }
        };

        fetchNFTs();

        const interval = setInterval(fetchNFTs, 30000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1 className="text-4xl font-bold text-center m-auto p-6 text-foreground mt-40">
                Weather NFTs
            </h1>
            {error && <p className="text-center text-red-500">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 mt-20 justify-items-center">
                {nfts.map((nft) => (
                    <NFTCard key={nft.id} nft={nft} onUpdate={() => {}} />
                ))}
            </div>
        </div>
    );
}
