import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { IoIosClose, IoIosMenu } from 'react-icons/io';
import { slide as Menu } from 'react-burger-menu';

const BurguerMenu = ({
  menuOpen,
  setMenuOpen,
  children,
  isInputHeaderShown,
}) => {
  const menuPosition = isInputHeaderShown
    ? 'bm-position-ht'
    : 'bm-position-woht';

  return (
    <Menu
      right
      className={`${menuPosition}`}
      overlayClassName={`${menuPosition}`}
      onClose={() => {
        setMenuOpen(!menuOpen);

        if (!menuOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.cssText = '';
        }
      }}
      isOpen={menuOpen}
      onOpen={() => {
        setMenuOpen(!menuOpen);

        if (!menuOpen) {
          document.body.style.overflowY = 'hidden';
          document.body.style.overflowX = 'auto';
        } else {
          document.body.style.cssText = '';
        }
      }}
      customCrossIcon={<></>}
      customBurgerIcon={
        menuOpen ? <IoIosClose size={20} /> : <IoIosMenu size={20} />
      }
    >
      {children}
    </Menu>
  );
};

export default BurguerMenu;
