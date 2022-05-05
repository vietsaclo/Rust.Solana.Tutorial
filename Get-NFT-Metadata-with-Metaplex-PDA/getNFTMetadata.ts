import { Connection } from '@metaplex/js'; 
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { PublicKey } from '@solana/web3.js';

(async () => {
  const connection = new Connection('mainnet-beta');
  const tokenMint = 'EgupsjW5iKCUFB2bbif97Fdxy9wHB4PG6hPUvCPE9mhi';
  const metadataPDA = await Metadata.getPDA(new PublicKey(tokenMint));
  const tokenMetadata = await Metadata.load(connection, metadataPDA);
  console.log(tokenMetadata.data);

    //name of the NFT
    const name: String = tokenMetadata.data.data["name"];

    //creators and share of the revenue
    const creators: any = JSON.stringify(tokenMetadata.data.data["creators"]);
    console.log("creators: {}",creators.toString());

    //seller basis
    const sellerFeeBasisPoints: number = tokenMetadata.data.data["sellerFeeBasisPoints"];
    console.log("sellerFeeBasisPoints: "+ sellerFeeBasisPoints);

  /*
    MetadataData {
      key: 4,
      updateAuthority: 'EgupsjW5iKCUFB2bbif97Fdxy9wHB4PG6hPUvCPE9mhi',
      mint: '9ARngHhVaCtH5JFieRdSS5Y8cdZk2TMF4tfGSWFB9iSK',
      data: MetadataDataData {
        name: 'SMB #1355',
        symbol: 'NFTPro',
        uri: 'https://www.arweave.net/1r-ImuiIxFl18UQolAoBnwLDMVcjkVAHruhtsaBpA7U?ext=json',
        sellerFeeBasisPoints: 500,
        creators: [ [Creator] ]
      },
      primarySaleHappened: 1,
      isMutable: 1
    }


    ARWEAVE
    {
	"name": "Albino Lion Punk",
	"symbol": "NFTPro",
	"description": "Lion King Punk humanoid smoking some post-human cigarette with nutrients needed to survive due to his biological limitations, this lion humanoid was created by a BAD AI combining human and lion genes to “improve” senses and brain if this lion punk doesn’t obey the bad AI the futuristic cigarette will not work and will lost his life.\nOwning this NFT rewards you in Serpent Academy. Coming Soon.\n",
	"seller_fee_basis_points": 700,
	"image": "https://www.arweave.net/IMagnKaQfAGiM_UVQR11kgZbV0Niyp50L4lNiY4tvtI?ext=gif",
	"attributes": [{
		"trait_type": "Eyes",
		"value": "Glow"
	}, {
		"trait_type": "Rewards",
		"value": "200%"
	}, {
		"trait_type": "Civilization",
		"value": "Lions Rise"
	}],
	"external_url": "https://lionpunks.org",
	"properties": {
		"files": [{
			"uri": "https://www.arweave.net/UGHWWjnhiXBVJteVPe32OYYAbOdIs6KnuYqWCwAkMBw?ext=gif",
			"type": "image/gif"
		}],
		"category": "image",
		"creators": [{
			"address": "9m5kFDqgpf7Ckzbox91RYcADqcmvxW4MmuNvroD5H2r9",
			"verified": true,
			"share": 100
		}]
	}
}
  */
})();