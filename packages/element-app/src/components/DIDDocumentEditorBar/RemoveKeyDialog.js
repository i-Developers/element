import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import SelectOne from '../SelectOne';

export class RemoveKeyDialog extends React.Component {
  state = {
    selected: undefined,
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.selected);
  };

  render() {
    const { selected } = this.state;
    const { open } = this.props;
    const suggestions = Object.values(this.props.keys).map(key => ({
      label: key.id,
      value: key.id,
    }));
    return (
      <Dialog
        fullWidth
        open={open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Remove Key</DialogTitle>
        <DialogContent style={{ minHeight: '200px' }}>
          <SelectOne
            label={'Select a key'}
            placeholder={'Choose from this list or create your own'}
            suggestions={suggestions}
            value={this.state.selected}
            onChange={item => {
              this.setState({
                selected: item,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!selected}
            onClick={this.handleSubmit}
            color="primary"
            variant="contained"
          >
            Remove Key
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

RemoveKeyDialog.propTypes = {
  open: PropTypes.bool,
  keys: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default RemoveKeyDialog;
