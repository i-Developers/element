import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { compose } from 'recompose';

import { Typography, LinearProgress } from '@material-ui/core';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Pages } from '../../../components/index';

import wallet from '../../../redux/wallet';
import ligthNode from '../../../redux/lightNode';

import { DIDDocument } from '../../../components/DIDDocument';
import { SidetreeTransaction } from '../../../components/SidetreeTransaction';

class DAppDIDViewAllPAge extends Component {
  componentWillMount() {
    this.props.getAll();
  }

  render() {
    const { tree } = this.props.lightNode;
    return (
      <Pages.WithNavigation>
        {!tree ? (
          <LinearProgress color="primary" variant="query" />
        ) : (
          <div>
            <Typography variant="h6">DID List</Typography>
            <br />

            {Object.values(tree).map(record => (!record.doc ? (
              undefined
            ) : (
                <div key={record.doc.id}>
                  <DIDDocument
                    didDocument={record.doc}
                    onCopyToClipboard={(item) => {
                      console.log('snack bar', item);
                    }}
                  />

                  <ExpansionPanel style={{ width: '100%' }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Sidetree Transactions</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      {record.txns.map(txn => (
                        <SidetreeTransaction
                          key={txn.transactionNumber}
                          txn={txn}
                          blockchain={'Ethereum'}
                          network={'ropsten'}
                        />
                      ))}
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
            )))}
          </div>
        )}
      </Pages.WithNavigation>
    );
  }
}

DAppDIDViewAllPAge.propTypes = {
  lightNode: PropTypes.object.isRequired,
  resolveDID: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  getAll: PropTypes.func.isRequired,
};

const ConnectedPage = compose(
  withRouter,
  wallet.container,
  ligthNode.container,
)(DAppDIDViewAllPAge);

export { ConnectedPage as DAppDIDViewAllPAge };

export default ConnectedPage;