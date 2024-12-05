import MintNFTForm from "@/components/MintNFTForm";

export default function MintPage() {
    return (
        <div className="inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md mt-16">
                <MintNFTForm />
            </div>
        </div>
    );
}
