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
  const key: Uint8Array = Uint8Array.from([219, 210, 194, 18, 224, 215, 124, 229, 48, 223, 161, 2, 248, 230, 185, 106, 66, 4, 222, 67, 87, 150, 75, 89, 112, 142, 137, 31, 4, 199, 43, 216, 254, 238, 138, 192, 102, 178, 9, 182, 227, 37, 168, 221, 11, 186, 208, 72, 247, 90, 11, 204, 47, 118, 105, 115, 65, 4, 109, 61, 29, 203, 119, 104]);


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
  layout.encode({ counter: 3 }, data);


  const signer: web3.Keypair = web3.Keypair.fromSecretKey(key);
  let programId: web3.PublicKey = new web3.PublicKey("G5TNPLYcRPRWpg3NFMzpxij2GQuuLAY9MAsbkez3MThP");

  // Derive the address (public key) of a greeting account from the program so that it's easy to find later.

  //first create account with seed then refer with Public Key
  const GREETING_SEED = 'hello 41';
  // greetedPubkey = await web3.PublicKey.createWithSeed(
  //   signer.publicKey,
  //   GREETING_SEED,
  //   programId,
  // );

  greetedPubkey = new web3.PublicKey("8imh8apxXGYMhSP6D55eGAbhKjpjy2JpQJWJzKAM5wnb");


  let fees = 0;



  const lamports = await connection.getMinimumBalanceForRentExemption(
    GREETING_SIZE,
  );


  //This creteAccount with Seed  only first time    
  //  const transaction = new web3.Transaction()

  //  .add(
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


  let transaction: web3.Transaction = new web3.Transaction();
  transaction.add(
    new web3.TransactionInstruction({
      keys: [
        { pubkey: greetedPubkey, isSigner: false, isWritable: true }],
      programId,
      data: data


    })
  );
  // const transaction = new web3.Transaction().add(
  //   new web3.TransactionInstruction({
  //       keys: [{
  //         "pubkey": signer.publicKey
  //         ,
  //         "isSigner": true,
  //         "isWritable": true
  //          }],
  //       programId,
  //       data


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