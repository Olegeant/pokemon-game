import { useState } from 'react';
import { NotificationManager } from 'react-notifications';

import Menu from './Menu/Menu';
import NavBar from './NavBar/NavBar';
import Modal from '../Modal/Modal';
import LoginForm from '../LoginForm/LoginForm';

import FirebaseClass from '../../service/firebase';

const MenuHeader = ({ bgActive }) => {
  const [isOpen, setIsOpen] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleOpen = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleClickLogin = () => {
    setIsOpenModal(prevState => !prevState);
  };

  const handleSubmitLoginForm = async (mode, { email, password }) => {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    };

    const API_KEY = FirebaseClass.apiKey;
    let response;

    switch (mode) {
      case 'signUp':
        response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
          requestOptions,
        ).then(res => res.json());
        break;

      case 'signIn':
        response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
          requestOptions,
        ).then(res => res.json());
        break;

      default:
        NotificationManager.error('Oops! Something went wrong...', 'Error!');
        return;
    }

    if (response.hasOwnProperty('error')) {
      NotificationManager.error(response.error.message, 'Error!');
    } else {
      localStorage.setItem('idToken', response.idToken);
      NotificationManager.success('User registered', 'Success!');
    }
  };

  return (
    <>
      <Menu isOpen={isOpen} onMenuLinkClick={closeMenu} />
      <NavBar
        isOpen={isOpen}
        bgActive={bgActive}
        onClickHamburg={toggleOpen}
        onClickLogin={handleClickLogin}
      />
      <Modal title="Auth..." onCloseModal={handleClickLogin} isOpen={isOpenModal}>
        <LoginForm onSubmit={handleSubmitLoginForm} isOpenModal={isOpenModal} />
      </Modal>
    </>
  );
};

export default MenuHeader;
