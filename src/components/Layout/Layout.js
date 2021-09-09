import styles from './Layout.module.css';

const Layout = ({ title, descr, urlBg, colorBg = '#ffffff' }) => {
  return (
    <section
      className={styles.root}
      style={
        urlBg
          ? { backgroundImage: `url(${urlBg})` }
          : { backgroundColor: colorBg }
      }
    >
      <div className={styles.wrapper}>
        <article>
          <div className={styles.title}>
            <h3>{title}</h3>
            <span className={styles.separator}></span>
          </div>
          <div className={[styles.desc, styles.full].join(' ')}>
            <p>{descr}</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Layout;
