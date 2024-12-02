import { Button } from "../../components/ui/button";

export default function MintPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <h1 className="text-4xl font-bold mb-6">Mint NFTs</h1>
            <p className="text-lg mb-6">Esta es la página para crear nuevos NFTs.</p>
            <Button className="w-40 h-16 text-lg">Mint</Button>
        </div>
    );
}
