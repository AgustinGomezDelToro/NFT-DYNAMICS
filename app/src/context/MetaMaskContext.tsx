import { WagmiProvider, createConfig, http } from "wagmi";
import { avalancheFuji } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const INFURA_PROJECT_ID = "9eb78f13dc39478f8dc68f8ac3a571da";
const WALLETCONNECT_PROJECT_ID = "1c4f05bd5a92ee4a1f320d5be3760e6d"; // Cambiar por tu ID de WalletConnect

const config = createConfig(
    getDefaultConfig({
        // Tu red: Avalanche Fuji Testnet
        chains: [avalancheFuji],
        transports: {
            // URL de RPC para Avalanche Fuji Testnet
            [avalancheFuji.id]: http(`https://avalanche-fuji.infura.io/v3/${INFURA_PROJECT_ID}`),
        },

        // Claves necesarias
        walletConnectProjectId: WALLETCONNECT_PROJECT_ID,

        // Información requerida de la aplicación
        appName: "WeatherNFT App",

        // Información opcional de la aplicación
        appDescription: "Interact with WeatherNFT on Avalanche Fuji Testnet",
    })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ConnectKitProvider>{children}</ConnectKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};
