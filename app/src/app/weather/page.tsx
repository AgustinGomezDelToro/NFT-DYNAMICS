"use client";

import React, { useEffect, useState } from "react";
import { NFTCard } from "@/components/ui/NFTCard";
import { getMintedNFTs } from "@/lib/contract";
import { NFT } from "@/types/NFT";

export default function WeatherPage() {
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNFTs = async () => {
            try {
                setLoading(true);
                const mintedNFTs = await getMintedNFTs();
                setNfts(mintedNFTs);
            } catch (err) {
                console.error(err);
                setError("Failed to load NFTs. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchNFTs();
        const interval = setInterval(fetchNFTs, 30000); // Refresh every 30s
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold text-center mt-20">Weather NFTs</h1>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            {loading ? (
                <p className="text-center mt-4">Loading NFTs...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                    {nfts.length > 0 ? (
                        nfts.map((nft) => <NFTCard key={nft.tokenId} nft={nft} onUpdate={() => {}} />)
                    ) : (
                        <p className="text-center col-span-full text-gray-500">No NFTs to display.</p>
                    )}
                </div>
            )}
        </div>
    );
}
