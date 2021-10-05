import { Link } from 'react-router-dom';

import styles from './NavBar.module.css';
import cn from 'classnames';

import { ReactComponent as LoginSVG } from '../../../images/login.svg';
import { ReactComponent as UserSVG } from '../../../images/user.svg';
import { useSelector } from 'react-redux';
import { selectUserLoading, selectLocalId } from '../../../redux/user';

const NavBar = ({ isOpen, bgActive = false, onClickHamburg, onClickLogin }) => {
  const isLoadingUser = useSelector(selectUserLoading); //
  const localId = useSelector(selectLocalId); //

  return (
    <nav className={cn(styles.root, { [styles.bgActive]: bgActive })}>
      <div className={styles.navWrapper}>
        <p className={styles.brand}>LOGO</p>

        <div className={styles.loginAndMenu}>
          {!isLoadingUser && !localId && (
            <div className={styles.loginWrap} onClick={onClickLogin}>
              <LoginSVG />
            </div>
          )}
          {!isLoadingUser && localId && (
            <Link className={styles.loginWrap} to="/user">
              <UserSVG />
            </Link>
          )}
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
