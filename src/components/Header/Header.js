import styles from './Header.module.css';

const Header = ({ title, descr, onHeaderBtnClick }) => {
  return (
    <header className={styles.root}>
      <div className={styles.forest}></div>
      <div className={styles.silhouette}></div>
      <div className={styles.moon}></div>
      <div className={styles.container}>
        <h1>{title}</h1>
        <p>{descr}</p>
        <button type="button" onClick={onHeaderBtnClick}>
          Start Game
        </button>
      </div>
    </header>
  );
};

export default Header;
