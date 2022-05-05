const fs = require("fs");
const Arweave = require('arweave');

(async () => {

    const arweave = Arweave.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https',
        timeout: 20000,
        logging: false,
    });

    // Upload image to Arweave
    const data = fs.readFileSync('ape-punk.png');
    
    const transaction = await arweave.createTransaction({
        data: data
    });
    let key = await arweave.wallets.generate();
    //const wallet = await arweave.wallets('wallet.json');

    transaction.addTag('Content-Type', 'image/png');
    

    await arweave.transactions.sign(transaction, key);
    
    const response = await arweave.transactions.post(transaction);
    console.log(response);
    console.log(response.data)


})();
