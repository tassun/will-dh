var findPrime = require('find-prime');

export class PrimeUtils {

    public static getPrimes(min: number, max: number) : number[] {
        const result = Array(max + 1).fill(0).map((_, i) => i);
        for (let i = 2; i <= Math.sqrt(max + 1); i++) {
           for (let j = i ** 2; j < max + 1; j += i) delete result[j];
        }
        return Object.values(result.slice(min));
    }
     
    public static getRandomNum(min: number, max: number) : number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
     
    public static getRandomPrime(min: number, max: number) : number {
        const primes = this.getPrimes(min, max);
        return primes[this.getRandomNum(0, primes.length - 1)];
    }
     
    public static getPrimeNumber() : number {
        return this.getRandomPrime(1000,10000);
    }

    public static findPrime(bits: number = 256) : Promise<string> {
        return new Promise<string>((resolve, reject) => {
            findPrime(bits, function(error: any, prime : any) {
                if(error) {
                    reject(error);
                    return;
                }
                resolve(prime.toString());
            });
        });        
    }

}    
