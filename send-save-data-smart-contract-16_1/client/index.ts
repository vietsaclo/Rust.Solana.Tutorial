import * as borsh from 'borsh';
import * as web3 from "@solana/web3.js";
import * as BufferLayout from "@solana/buffer-layout";
const BN = require("bn.js");
import { Buffer } from "buffer";
/**
 * The public key of the account we are saying hello to
 */
let greetedPubkey: web3.PublicKey;
/**
* The state of a greeting account managed by the hello world program
*/
class GreetingAccount {
  counter = 0;
  constructor(fields: { counter: number } | undefined = undefined) {
    if (fields) {
      this.counter = fields.counter;
    }
  }
}

/**
* Borsh schema definition for greeting accounts
*/
const GreetingSchema = new Map([
  [GreetingAccount, { kind: 'struct', fields: [['counter', 'u32']] }],
]);

/**
 * The expected size of each greeting account.
 */
const GREETING_SIZE = borsh.serialize(
  GreetingSchema,
  new GreetingAccount(),
).length;



const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

async function main() {
  // const key: Uint8Array = Uint8Array.from([85,235,184,154,115,49,48,92,245,61,221,192,59,79,10,150,61,50,98,136,11,171,198,7,80,182,119,135,53,193,99,164,70,64,63,26,76,125,14,140,14,235,103,237,136,117,75,250,178,64,126,58,198,210,253,112,50,10,0,83,21,102,124,173]);
  const key: Uint8Array = Uint8Array.from([47, 107, 236, 147, 222, 225, 75, 61, 193, 86, 120, 5, 211, 78, 245, 241, 29, 213, 133, 195, 172, 70, 117, 100, 16, 212, 238, 204, 106, 188, 34, 185, 222, 149, 136, 29, 228, 132, 1, 164, 115, 250, 15, 250, 143, 55, 192, 136, 140, 215, 12, 35, 250, 31, 67, 247, 54, 163, 172, 228, 179, 241, 30, 67]);

  const data_to_send: Buffer = Buffer.from(

    Uint8Array.of(0, ...new BN(10).toArray("le", 8)

    ));

  const data_b = borsh.serialize(
    GreetingSchema,
    new GreetingAccount(),

  )

  //NO
  const layout = BufferLayout.struct([BufferLayout.u32("counter")])
  let data: Buffer = Buffer.alloc(layout.span);
  layout.encode({ counter: 1 }, data);


  const signer: web3.Keypair = web3.Keypair.fromSecretKey(key);
  let programId: web3.PublicKey = new web3.PublicKey("Aoe2UL2umvxfYLxqMz5GJSh68SrqBJdjxPUuHasDkSNz");

  // Derive the address (public key) of a greeting account from the program so that it's easy to find later.

  //first create account with seed then refer with Public Key
  // const GREETING_SEED = 'hello 41';
  // greetedPubkey = await web3.PublicKey.createWithSeed(
  //   signer.publicKey,
  //   GREETING_SEED,
  //   programId,
  // );

  // greetedPubkey = new web3.PublicKey("3C5ew72q1nBY1bowgHDq4PNkDbiPcnJVxsJEm3Bz9ABu");
  greetedPubkey = new web3.PublicKey('EXNDbkGj5C8ByCm7hLzMDVNd4RUHJUnh2cxTTqey1ibB');

  let fees = 0;



  const lamports = await connection.getMinimumBalanceForRentExemption(
    GREETING_SIZE,
  );


  //This creteAccount with Seed  only first time    
  let transaction = new web3.Transaction();

  // transaction.add(
  //   web3.SystemProgram.createAccountWithSeed({
  //     fromPubkey: signer.publicKey,
  //     basePubkey: signer.publicKey,
  //     seed: GREETING_SEED,
  //     newAccountPubkey: greetedPubkey,
  //     lamports,
  //     space: GREETING_SIZE,
  //     programId,
  //   }),
  // );

  transaction.add(
    new web3.TransactionInstruction({
      keys: [
        { pubkey: greetedPubkey, isSigner: false, isWritable: true }],
      programId,
      data: data
    })
  );
  // transaction.add(
  //   new web3.TransactionInstruction({
  //     keys: [
  //       { pubkey: signer.publicKey, isSigner: false, isWritable: true }],
  //     programId,
  //     data: data
  //   })
  // );

  await web3
    .sendAndConfirmTransaction(connection, transaction, [signer])
    .then((sig) => {
      console.log("sig: {}", sig);
    });
  reportGreetings();


}
async function reportGreetings(): Promise<void> {
  const accountInfo = await connection.getAccountInfo(greetedPubkey);
  if (accountInfo === null) {
    throw 'Error: cannot find the greeted account';
  }
  const greeting = borsh.deserialize(
    GreetingSchema,
    GreetingAccount,
    accountInfo.data,
  );
  console.log(
    greetedPubkey.toBase58(),
    'has been greeted',
    Number(greeting.counter),
    'time(s)',
  );
}

main();