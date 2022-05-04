import * as web3 from '@solana/web3.js';

const connection = new web3.Connection(web3.clusterApiUrl('devnet'));

async function main() {
  const key: Uint8Array = Uint8Array.from([219, 210, 194, 18, 224, 215, 124, 229, 48, 223, 161, 2, 248, 230, 185, 106, 66, 4, 222, 67, 87, 150, 75, 89, 112, 142, 137, 31, 4, 199, 43, 216, 254, 238, 138, 192, 102, 178, 9, 182, 227, 37, 168, 221, 11, 186, 208, 72, 247, 90, 11, 204, 47, 118, 105, 115, 65, 4, 109, 61, 29, 203, 119, 104]);
  const signer = web3.Keypair.fromSecretKey(key);

  // contract address
  const contractAddress = '6vGD4DYtR2GuuYd2qeVVSBN3zNmBrHTDeLEZrUrG4Phe';
  const program_id: web3.PublicKey = new web3.PublicKey(contractAddress);

  let transaction = new web3.Transaction();
  transaction.add(
    new web3.TransactionInstruction({
      keys: [],
      programId: program_id,
      data: Buffer.alloc(0),
    })
  );

  await web3.sendAndConfirmTransaction(connection, transaction, [signer])
    .then((value) => {
      console.log("Success value: {}", value);

    })
    .catch((reason) => {
      console.log("Error reason: {}", reason);

    });
}

main();