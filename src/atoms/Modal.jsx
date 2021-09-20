import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Modal, Fade, Backdrop, makeStyles } from '@material-ui/core';

const CustomModal = ({ children, bodyStyles, open, onClose, ...props }) => {
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: isTablet ? 'unset' : 'center',
      justifyContent: 'center',
    },
  }));

  const defaultStyles = useStyles();

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={defaultStyles.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={bodyStyles}>{children}</div>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
