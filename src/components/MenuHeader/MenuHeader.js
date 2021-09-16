import { useState } from 'react';
import Menu from './Menu/Menu';
import NavBar from './NavBar/NavBar';

const MenuHeader = ({ bgActive }) => {
  const [isOpen, setIsOpen] = useState(null);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleOpen = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <>
      <Menu isOpen={isOpen} onMenuLinkClick={closeMenu} />
      <NavBar isOpen={isOpen} bgActive={bgActive} onClickHamburg={toggleOpen} />
    </>
  );
};

export default MenuHeader;
