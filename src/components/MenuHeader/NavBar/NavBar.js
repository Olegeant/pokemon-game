import styles from './NavBar.module.css';
import cn from 'classnames';

const NavBar = ({ isOpen, bgActive = false, onClickHamburg }) => {
  return (
    <nav className={cn(styles.root, { [styles.bgActive]: bgActive })}>
      <div className={styles.navWrapper}>
        <p className={styles.brand}>LOGO</p>
        <div
          className={cn(styles.menuButton, { [styles.active]: isOpen })}
          onClick={onClickHamburg}
        >
          <span />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
