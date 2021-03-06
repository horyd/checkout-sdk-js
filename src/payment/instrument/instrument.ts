export default interface Instrument {
    bigpayToken: string;
    provider: string;
    iin: string;
    last4: string;
    expiryMonth: string;
    expiryYear: string;
    brand: string;
    trustedShippingAddress: boolean;
}

export interface VaultAccessToken {
    vaultAccessToken: string;
    vaultAccessExpiry: number;
}

export interface SessionContext {
    customerId: number;
    storeId: string;
}

export interface InstrumentRequestContext extends SessionContext {
    authToken: string;
}
