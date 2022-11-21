import { DH } from "../dh/DH";

async function testDH() {
    let alice = new DH();
    await alice.init();

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

testDH();
