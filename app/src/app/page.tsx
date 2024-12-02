"use client";

import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";

export default function Home() {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center min-h-screen space-x-4">
            <Button
                className="w-40 h-16 text-lg bg-primary text-white"
                onClick={() => router.push("/mint")}
            >
                MINT
            </Button>
            <Button
                className="w-40 h-16 text-lg bg-primary text-white"
                onClick={() => router.push("/weather")}
            >
                Weather
            </Button>
        </div>
    );
}
