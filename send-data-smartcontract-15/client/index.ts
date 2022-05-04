import * as web3 from "@solana/web3.js";
const BN = require('bn.js');

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

async function main() {
  const key: Uint8Array = Uint8Array.from([219, 210, 194, 18, 224, 215, 124, 229, 48, 223, 161, 2, 248, 230, 185, 106, 66, 4, 222, 67, 87, 150, 75, 89, 112, 142, 137, 31, 4, 199, 43, 216, 254, 238, 138, 192, 102, 178, 9, 182, 227, 37, 168, 221, 11, 186, 208, 72, 247, 90, 11, 204, 47, 118, 105, 115, 65, 4, 109, 61, 29, 203, 119, 104]);
  const signer = web3.Keypair.fromSecretKey(key);
  let programId: web3.PublicKey = new web3.PublicKey("BsABbm2qozLeNjaaBhV68gEcfexbKiFdTGspnKrphw9m");

  const data_to_send: Buffer = Buffer.from(
    Uint8Array.of(0,
      ...new BN(257).toArray("le", 8))
  );

  let transaction: web3.Transaction = new web3.Transaction();

  transaction.add(
    new web3.TransactionInstruction({
      keys: [],
      programId,
      data: data_to_send
    })
  );
  await web3
    .sendAndConfirmTransaction(connection, transaction, [signer])
    .then((sig) => {
      console.log("sig: {}", sig);
    });
}

main();