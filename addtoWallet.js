'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');

// A wallet stores a collection of identities
const wallet = new FileSystemWallet('./wallet');

let user = 'user4-mars.morgen.net'
let pkFileName = 'bb0ff6674458877b07ffb085f51fb788a1eed862aefdb046b1086f5ee55c497c_sk';

async function main() {
  // Main try/catch block
  try {
    // Identity to credentials to be stored in the wallet
    const certPath = '../ca-mars.morgen.net/users/'+user+'/msp/signcerts/cert.pem';
    const cert = fs.readFileSync(certPath).toString();
    
    const keyPath = '../ca-mars.morgen.net/users/'+user+'/msp/keystore/'+pkFileName;
    const key = fs.readFileSync(keyPath).toString();

    // Load credentials into wallet
    const identityLabel = user;
    const identity = X509WalletMixin.createIdentity('marsMSP', cert, key);

    await wallet.import(identityLabel, identity);

  } catch (error) {
    console.log(`Error adding to wallet. ${error}`);
    console.log(error.stack);
  }
}


main().then(() => {
  console.log(`User ${user} successfully adding to wallet.`);
}).catch((e) => {
  console.log(e);
  console.log(e.stack);
  process.exit(-1);
});