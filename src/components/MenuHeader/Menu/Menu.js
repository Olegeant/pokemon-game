import styles from './Menu.module.css';
import cn from 'classnames';

const Menu = ({ isActive }) => {
  return (
    <div
      className={cn(
        styles.menuContainer,
        { [styles.active]: isActive },
        { [styles.deactive]: !isActive },
      )}
    >
      <div className={styles.overlay} />
      <div className={styles.menuItems}>
        <ul>
          <li>
            <a href="#welcome">HOME</a>
          </li>
          <li>
            <a href="#game">GAME</a>
          </li>
          <li>
            <a href="#about">ABOUT</a>
          </li>
          <li>
            <a href="#contact">CONTACT</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
