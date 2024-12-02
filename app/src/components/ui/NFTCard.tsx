"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NFT {
    id: number;
    name: string;
    description: string;
    image: string;
}

interface NFTCardProps {
    nft: NFT;
    onUpdate: (id: number) => void;
}

export function NFTCard({ nft, onUpdate }: NFTCardProps) {
    return (
        <Card className="w-full max-w-sm shadow-lg rounded-md border">
            <CardHeader>
                <CardTitle className="text-xl font-bold">{nft.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-full h-48 object-cover rounded-md"
                    />
                    <p className="text-sm text-gray-500">{nft.description}</p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button className="bg-primary text-white" onClick={() => onUpdate(nft.id)}>
                    Actualizar
                </Button>
            </CardFooter>
        </Card>
    );
}
