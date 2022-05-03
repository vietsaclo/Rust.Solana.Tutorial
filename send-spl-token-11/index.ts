import { Keypair, PublicKey, Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo, transfer } from "@solana/spl-token";

(async () => {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const secrect = Uint8Array.from([219, 210, 194, 18, 224, 215, 124, 229, 48, 223, 161, 2, 248, 230, 185, 106, 66, 4, 222, 67, 87, 150, 75, 89, 112, 142, 137, 31, 4, 199, 43, 216, 254, 238, 138, 192, 102, 178, 9, 182, 227, 37, 168, 221, 11, 186, 208, 72, 247, 90, 11, 204, 47, 118, 105, 115, 65, 4, 109, 61, 29, 203, 119, 104]);

  const myKeyPair = Keypair.fromSecretKey(secrect);

  const fromWallet = myKeyPair;

  // wallet to
  const toAddress = '4oNaE5P7eBMAqHbdvnJoRy4QXFYYUCJiuunjBHEHxuUF';
  const destPublicKey = new PublicKey(toAddress);

  // token
  const tokenAddress =
    // '5BDm6GsEkFMFRtFSFBv1Jkm1qYZUoQYKwx9yF9FGJvmZ';
    'EMfxhLZnVoMJgME3CawvVrUzWYiazSYC9vsekt4WdQ4C';
  const destMint: PublicKey = new PublicKey(tokenAddress);
  const tokenM = new PublicKey(tokenAddress);

  // Get the token account of the fromWallet address, and if it does not exist, create it
  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    fromWallet,
    tokenM,
    fromWallet.publicKey
  );

  // Get the token account of the toWallet address, and if it does not exist, create it
  const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromWallet, tokenM, destPublicKey);

  // Mint 1 new token to the "fromTokenAccount" account we just created
  let signature = await mintTo(
    connection,
    fromWallet,
    destMint,
    fromTokenAccount.address,
    fromWallet.publicKey,
    3 * LAMPORTS_PER_SOL
  );
  console.log('mint tx:', signature);

  // Transfer the new token to the "toTokenAccount" we just created
  signature = await transfer(
    connection,
    fromWallet,
    fromTokenAccount.address,
    toTokenAccount.address,
    fromWallet.publicKey,
    10 * LAMPORTS_PER_SOL
  );
})();