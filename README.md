# will-dh

Diffie-Hellman Utilities 

## Installation

    npm install will-dh

#### DH
DH class implement for handle diffie-hellman algorithm 

#### Usage

```typescript
import { DH } from "will-dh";

async function testDH() {
    let alice = new DH();
    await alice.init();
    //it can specified bit length when init (default = 256)
    //await alice.init(256);

    let bob = new DH();
    await bob.init();
    bob.computePublicKey();

    //using the same prime & generator 
    alice.prime = bob.prime;
    alice.generator = bob.generator;
    //exchange public key
    alice.otherPublicKey = bob.publicKey;
    alice.compute();
    console.log("alice",alice);

    //exchange public key
    bob.otherPublicKey = alice.publicKey;
    bob.computeSharedKey();
    console.log("bob",bob);

    let amsg = "hello bob";

    let encamsg = alice.encrypt(amsg);
    console.log("alice: msg =",amsg);
    console.log("alice.encrypt: msg =",encamsg);
    console.log("alice.decrypt: msg =",alice.decrypt(encamsg));

    let decamsg = bob.decrypt(encamsg);
    console.log("bob.decrypt: alice msg =",decamsg);

    let bmsg = "Hi alice";
    let encbmsg = bob.encrypt(bmsg);
    console.log("bob: msg =",bmsg);
    console.log("bob.encrypt: msg =",encbmsg);
    console.log("bob.decrypt: msg =",bob.decrypt(encbmsg));

    let decbmsg = alice.decrypt(encbmsg);
    console.log("alice.decrypt: bob msg =",decbmsg);

}

```

DH attributes

    //prime number of BigInterger
    prime: '94458672269377221277610474615446873905476334768963771230807244630173242881841',
    //generator for cyclic groups
    generator: '1531',
    //this is private key
    privateKey: '26582905923107066001337478380460780759086336660259788163257456672805955270421',
    //this is public key for exchanged
    publicKey: '12625180956055143834488162446739091054997655188134515970201628248799161883148',
    //this is shared key
    sharedKey: '24836578469540121857308390695759879176440969040909857766543092812754760939849',
    //and other public key exchanged
    otherPublicKey: '7628171798251456620733591161511116487866959607998138493347188246187154049907'

