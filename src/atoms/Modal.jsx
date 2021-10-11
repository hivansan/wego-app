import React from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Modal,
  Fade,
  Backdrop,
  makeStyles,
  Dialog,
  DialogContent,
} from '@material-ui/core';

const CustomModal = ({
  children,
  bodyStyles,
  open,
  onClose,
  isLoading,
  modalStyles,
  ...props
}) => {
  console.log(isLoading);

  if (!isLoading) {
    return (
      <Dialog
        onClose={onClose}
        open={open}
        scroll={'body'}
        className={modalStyles}
        maxWidth={'lg'}
      >
        <DialogContent
          className={`${bodyStyles} justify-content-center align-items-center`}
        >
          <div className='modal-loader'>
            <div className='spinner-border' role='status'></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog
      onClose={onClose}
      open={open}
      scroll={'body'}
      className={modalStyles}
      maxWidth={'lg'}
    >
      <DialogContent className={bodyStyles}>{children}</DialogContent>
    </Dialog>
  );
};

export default CustomModal;
