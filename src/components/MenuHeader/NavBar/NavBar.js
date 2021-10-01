import styles from './NavBar.module.css';
import cn from 'classnames';

import { ReactComponent as LoginSVG } from '../../../images/login.svg';

const NavBar = ({ isOpen, bgActive = false, onClickHamburg, onClickLogin }) => {
  return (
    <nav className={cn(styles.root, { [styles.bgActive]: bgActive })}>
      <div className={styles.navWrapper}>
        <p className={styles.brand}>LOGO</p>

        <div className={styles.loginAndMenu}>
          <div className={styles.loginWrap} onClick={onClickLogin}>
            <LoginSVG />
          </div>
          <div
            className={cn(styles.menuButton, { [styles.active]: isOpen })}
            onClick={onClickHamburg}
          >
            <span />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
