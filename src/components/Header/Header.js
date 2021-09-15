import styles from './Header.module.css';

const Header = ({ title, descr, onChangePage }) => {
  return (
    <header className={styles.root}>
      <div className={styles.forest}></div>
      <div className={styles.container}>
        <h1>{title}</h1>
        <p>{descr}</p>
        <button type="button" onClick={() => onChangePage('game')}>
          Start Game
        </button>
      </div>
    </header>
  );
};

export default Header;
