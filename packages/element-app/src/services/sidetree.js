import element from '@transmute/element-lib';
import config from '../config';

const storage = element.storage.ipfs.configure({
  multiaddr: config.ELEMENT_IPFS_MULTIADDR,
});
const db = new element.adapters.database.ElementPouchDBAdapter({
  name: 'element-pouchdb.element-app',
});
const serviceBus = new element.adapters.serviceBus.ElementNanoBusAdapter();
const blockchain = element.blockchain.ethereum.configure({
  // META MASK
  anchorContractAddress: config.ELEMENT_CONTRACT_ADDRESS,
});

export const sidetree = new element.Sidetree({
  blockchain,
  storage,
  serviceBus,
  db,
  config: {
    VERBOSITY: 1,
  },
});

export const getSidetree = async () => {
  await blockchain.resolving;
  return sidetree;
};