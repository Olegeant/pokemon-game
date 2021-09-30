import Spinner from 'react-loader-spinner';

import styles from './Loader.module.css';

export default function Loader({
  type = 'ThreeDots',
  color = '#f300b4',
  height = 180,
  width = 180,
}) {
  return (
    <Spinner className={styles.Loader} type={type} color={color} height={height} width={width} />
  );
}
