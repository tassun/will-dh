var BigInteger = require('bigi');
var CryptoJS = require("crypto-js");
import { PrimeUtils } from "./PrimeUtils";

export class DH {
    prime: string;
    generator: string;
    privateKey: string;
    publicKey: string;
    sharedKey: string;
    otherPublicKey: string;

    constructor() {
        this.prime = ""+PrimeUtils.getPrimeNumber();
        this.generator = ""+PrimeUtils.getPrimeNumber();
        this.privateKey = ""+PrimeUtils.getPrimeNumber();
        this.publicKey = ""+PrimeUtils.getPrimeNumber();
        this.sharedKey = ""+PrimeUtils.getPrimeNumber();
        this.otherPublicKey = ""+PrimeUtils.getPrimeNumber();  
    }

    public async init(bits: number = 256) {
        this.prime = await PrimeUtils.findPrime(bits);
        this.privateKey = await PrimeUtils.findPrime(bits-2);
        this.computePublicKey();
        while(this.publicKey=='1') {
            this.privateKey = await PrimeUtils.findPrime(bits-2);
            this.computePublicKey();    
        }
    }

    public encryptText(word: string, keyBase64: string) {
        var key = CryptoJS.enc.Base64.parse(keyBase64);
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
        return encrypted.toString();
    }

    public decryptText(word: string, keyBase64: string) {
        var key = CryptoJS.enc.Base64.parse(keyBase64);
        var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }

    public encrypt(word: string) {
        let hash = CryptoJS.SHA256(this.sharedKey);
        var keyBase64 = hash.toString(CryptoJS.enc.Base64);
        var key = CryptoJS.enc.Base64.parse(keyBase64);
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
        return encrypted.toString();
    }

    public decrypt(word: string) {
        let hash = CryptoJS.SHA256(this.sharedKey);
        var keyBase64 = hash.toString(CryptoJS.enc.Base64);
        var key = CryptoJS.enc.Base64.parse(keyBase64);
        var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }
 
    public computePublicKey() {	
        var G = new BigInteger(this.generator);
        var P = new BigInteger(this.prime);
        var a = new BigInteger(this.privateKey);
        var ap = G.modPowInt(a.intValue(), P);
        this.publicKey = ap.toString();
    }

    public computeSharedKey() {
        var P = new BigInteger(this.prime);
        var a = new BigInteger(this.privateKey);
        var bp = new BigInteger(this.otherPublicKey);		
        var ashare = bp.modPowInt(a.intValue(), P);
        this.sharedKey = ashare.toString();
    }
 
    public compute() {
        this.computePublicKey();
        this.computeSharedKey();
    }
 
}
