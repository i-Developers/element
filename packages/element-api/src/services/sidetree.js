const element = require('@transmute/element-lib');
const ElementFirestoreAdapter = require('./element-adapter-firestore');

const { getBaseConfig } = require('../config');

const config = getBaseConfig();

const { firebaseAdmin } = require('./firebase');

const db = new ElementFirestoreAdapter({
  name: 'element-pouchdb.element-app',
  firebaseAdmin,
});

const serviceBus = new element.adapters.serviceBus.ElementNanoBusAdapter();

const blockchain = element.blockchain.ethereum.configure({
  mnemonic: config.ethereum.mnemonic,
  hdPath: "m/44'/60'/0'/0/0",
  providerUrl: config.ethereum.provider_url,
  anchorContractAddress: config.ethereum.anchor_contract_address,
});

const storage = element.storage.ipfs.configure({
  multiaddr: config.ipfs.multiaddr,
});

const sidetree = new element.Sidetree({
  blockchain,
  storage,
  serviceBus,
  db,
  config: {
    BATCH_INTERVAL_SECONDS: config.sidetree.batch_interval_in_seconds,
    BAD_STORAGE_HASH_DELAY_SECONDS: config.sidetree.bad_storage_hash_delay_in_seconds,
    VERBOSITY: config.sidetree.verbosity,
  },
});

// const getSidetree = async () => {
//   if (!sidetree.batchInterval) {
//     await blockchain.resolving;
//     await sidetree.startBatching();
//   }

//   return sidetree;
// };

module.exports = sidetree;
