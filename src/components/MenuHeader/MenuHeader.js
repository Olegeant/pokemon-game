import { useState } from 'react';
import Menu from './Menu/Menu';
import NavBar from './NavBar/NavBar';

const MenuHeader = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(prevState => !prevState);
  };

  return (
    <>
      <Menu isActive={isActive} />
      <NavBar isActive={isActive} onNavBarClick={toggleActive} />
    </>
  );
};

export default MenuHeader;
