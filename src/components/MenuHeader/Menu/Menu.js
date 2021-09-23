import { Link } from 'react-router-dom';

import styles from './Menu.module.css';
import cn from 'classnames';

const MENU = [
  { title: 'HOME', to: '/' },
  { title: 'GAME', to: '/game' },
  { title: 'ABOUT', to: '/about' },
  { title: 'CONTACT', to: '/contact' },
];

const Menu = ({ isOpen, onMenuLinkClick }) => {
  return (
    <div
      className={cn(
        styles.menuContainer,
        { [styles.active]: isOpen === true },
        { [styles.deactive]: isOpen === false },
      )}
    >
      <div className={styles.overlay} />
      <div className={styles.menuItems}>
        <ul>
          {MENU.map(({ title, to }, idx) => (
            <li key={idx}>
              <Link to={to} onClick={onMenuLinkClick}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
