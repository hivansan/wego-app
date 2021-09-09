import React, { Component } from 'react';
import { DialogContent, Dialog, Slide } from '@material-ui/core';

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

class UnlockModal extends Component {
  render() {
    const { closeModal, modalOpen } = this.props;

    const fullScreen = window.innerWidth < 450;

    return (
      <Dialog
        open={true}
        onClose={closeModal}
        fullWidth={true}
        maxWidth={'sm'}
        TransitionComponent={Transition}
        fullScreen={fullScreen}
      >
        <DialogContent>
          <h1>modal</h1>
        </DialogContent>
      </Dialog>
    );
  }
}

export default UnlockModal;
