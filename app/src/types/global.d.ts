interface EthereumProvider {
    // Método para realizar solicitudes (por ejemplo, eth_requestAccounts, eth_chainId)
    request: <T = unknown>(args: { method: string; params?: unknown[] }) => Promise<T>;

    // Métodos para agregar y eliminar escuchadores de eventos
    on?: (event: EthereumEvent, handler: (...args: unknown[]) => void) => void;
    removeListener?: (event: EthereumEvent, handler: (...args: unknown[]) => void) => void;
}

// Eventos comunes del proveedor Ethereum
type EthereumEvent = "accountsChanged" | "chainChanged" | "connect" | "disconnect";

interface Window {
    // Ethereum puede o no estar definido
    ethereum?: EthereumProvider;
}
