export declare class DH {
    prime: string;
    generator: string;
    privateKey: string;
    publicKey: string;
    sharedKey: string;
    otherPublicKey: string;
    constructor();
    init(bits?: number): Promise<void>;
    encryptText(word: string, keyBase64: string): any;
    decryptText(word: string, keyBase64: string): any;
    encrypt(word: string): any;
    decrypt(word: string): any;
    computePublicKey(): void;
    computeSharedKey(): void;
    compute(): void;
}

export declare class PrimeUtils {
    static getPrimes(min: number, max: number): number[];
    static getRandomNum(min: number, max: number): number;
    static getRandomPrime(min: number, max: number): number;
    static getPrimeNumber(): number;
    static findPrime(bits?: number): Promise<string>;
}
