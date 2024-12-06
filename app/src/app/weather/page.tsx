"use client";

import React, { useEffect, useState } from "react";
import { NFTCard } from "@/components/ui/NFTCard";
import { getMintedNFTs } from "@/lib/contract";
import { NFT } from "@/types/NFT";

export default function WeatherPage() {
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const handleUpdate = (updatedNFT: NFT) => {
        setNfts((prevNfts) =>
            prevNfts.map((nft) => (nft.tokenId === updatedNFT.tokenId ? updatedNFT : nft))
        );
    };

    useEffect(() => {
        const fetchNFTs = async () => {
            try {
                const data = await getMintedNFTs();
                setNfts(data.slice(0, 3));
            } catch (error) {
                setError("Failed to fetch NFTs. Please try again later.");
                console.error("Error fetching NFTs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNFTs();

        // Refresca los datos cada 30 segundos
        const interval = setInterval(fetchNFTs, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="">
            <h1 className="text-4xl font-bold text-center p-6 text-foreground">Weather NFTs</h1>
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}
            {loading ? (
                <p className="text-center mt-4 text-gray-500">Loading NFTs...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-10 justify-items-center">
                    {nfts.length > 0 ? (
                        nfts.map((nft) => (
                            <NFTCard key={nft.tokenId} nft={nft} onUpdate={handleUpdate} />
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">No NFTs to display.</p>
                    )}
                </div>
            )}
        </div>
    );
}
