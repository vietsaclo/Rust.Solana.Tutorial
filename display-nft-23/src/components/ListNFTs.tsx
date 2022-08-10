import { FC, useCallback, useEffect } from "react";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import * as Web3 from '@solana/web3.js';

let tokensInWallet: any[] = [];
let totalNFTsI = 0;

const ListNFTsComponent: FC = () => {
  const { connection } = useConnection();
  const { wallet, publicKey, connected } = useWallet();
  console.log(connection, wallet, publicKey, connected);

  const getTokens = useCallback((pubKey: string) => {
    if (!connected || !pubKey) return;
    connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, {
      filters: [
        {
          dataSize: 165, // number of bytes
        },
        {
          memcmp: {
            offset: 32, // number of bytes
            bytes: pubKey, // base58 encoded string
          },
        },
      ],
    })
      .then((accounts) => {
        console.log(
          `Found ${accounts.length} token account(s) for wallet ${pubKey}: `
        );

        accounts.forEach((account: any, i) => {
          // account.account.data;
          let amountI = account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"];
          let mint_s = account.account.data["parsed"]["info"]["mint"];
          console.log(amountI, mint_s);
          if (amountI === 1) {
            totalNFTsI += 1;

            try {
              console.log(
                `-- Token Account Address ${i + 1}: ${account.pubkey.toString()} --`
              );
              console.log(`Mint: ${mint_s}`);
              let objT: any = {};
              objT.mint = mint_s
              objT.amount = amountI
              tokensInWallet.push(objT)

              // let token_amount_i = account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"]
              console.log(
                `Amount: ${amountI}`

              );
            } catch {
              //tokensInWallet.push({mint:mint_s,amount: amountI })
            }
          }
        });

        console.log(tokensInWallet, totalNFTsI);

        let currentI = 0
        tokensInWallet.forEach(element => {
          console.log("element[currentI].mint" + element.mint)
          getAccountMetaData(element.mint, element.amount, currentI)
          currentI += 1
        });

      })
      .catch((err) => {
        console.log(err);
      });
  }, [connection, connected]);

  async function getAccountMetaData(mintAddress: any, amountI: any, numberI: any) {
    (async () => {
      let mintPubkey = new Web3.PublicKey(mintAddress);
      let tokenmetaPubkey = await Metadata.getPDA(mintPubkey);

      const tokenmeta: any = await Metadata.load(connection, tokenmetaPubkey);
      //console.log(tokenmeta);
      // console.log(tokenmeta.data.data["name"])
      // nftsInWallet.push({name: tokenmeta.data.data["name"], uri: tokenmeta.data.data["uri"]})
      //console.log("nfts: "+nftsInWallet)
      tokensInWallet[numberI].name = tokenmeta.data.data["name"]
      tokensInWallet[numberI].uri = tokenmeta.data.data["uri"]
      console.log("uri: " + tokenmeta.data.data["uri"])
      // console.log(tokenmeta.data.data["uri"])
      //tokensInWallet.push({mint:mintAddress })
      // await UpdateTheUI(tokensInWallet[numberI], numberI)

      // UpdateTheUI(mintAddress, tokenmeta.data.data["uri"], tokenmeta.data.data["name"], numberI)
    })();
  }

  useEffect(() => {
    if (!publicKey) return;
    const pubKey = publicKey.toBase58();
    getTokens(pubKey);

  }, [getTokens, publicKey]);

  return (
    <p>List NFTs</p>
  );
}

export default ListNFTsComponent;