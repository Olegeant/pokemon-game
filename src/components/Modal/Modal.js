import { useRef, useEffect } from 'react';
import cn from 'classnames';

import styles from './Modal.module.css';

const Modal = ({ isOpen, title, children, onCloseModal }) => {
  const modalEl = useRef();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : null;
  }, [isOpen]);

  const handleCloseModal = () => {
    onCloseModal && onCloseModal(false);
  };

  const handleClickRoot = evt => {
    // if (evt.target !== evt.currentTarget) return;
    if (modalEl.current.contains(evt.target)) return;

    onCloseModal && onCloseModal(false);
  };

  return (
    <div className={cn(styles.root, { [styles.open]: isOpen })} onClick={handleClickRoot}>
      <div ref={modalEl} className={styles.modal}>
        <div className={styles.head}>
          {title}
          <span className={styles.btnClose} onClick={handleCloseModal}></span>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
