import { NextResponse } from "next/server";

export async function GET() {
    const mockNFTs = [
        {
            id: 1,
            name: "NEW YORK",
            description: "NFT basado en un día soleado.",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            name: "ROSARIO",
            description: "NFT basado en una noche lluviosa.",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 3,
            name: "PARIS",
            description: "NFT basado en una noche lluviosa.",
            image: "https://via.placeholder.com/150",
        },
    ];

    return NextResponse.json(mockNFTs);
}
