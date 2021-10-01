import styles from './Input.module.css';

const Input = ({ value, label, type = 'text', name, onChange, required }) => {
  return (
    <div className={styles.root}>
      <input
        name={name}
        type={type}
        className={styles.input}
        required
        value={value}
        onChange={onChange}
        required={required}
      />
      <span className={styles.highlight}></span>
      <span className={styles.bar}></span>
      <label className={styles.label}>{label}</label>
    </div>
  );
};

export default Input;
