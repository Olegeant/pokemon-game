import styles from './NavBar.module.css';
import cn from 'classnames';

const NavBar = ({ isActive, onNavBarClick }) => {
  return (
    <nav className={styles.root}>
      <div className={styles.navWrapper}>
        <p className={styles.brand}>LOGO</p>
        <a className={cn(styles.menuButton, { [styles.active]: isActive })} onClick={onNavBarClick}>
          <span />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
