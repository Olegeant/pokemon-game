import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NotificationManager } from 'react-notifications';

import Menu from './Menu/Menu';
import NavBar from './NavBar/NavBar';
import Modal from '../Modal/Modal';
import LoginForm from '../LoginForm/LoginForm';

import FirebaseClass from '../../service/firebase';
import { getUserUpdateAsync } from '../../redux/user';

const MenuHeader = ({ bgActive }) => {
  const [isOpen, setIsOpen] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const dispatch = useDispatch();

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
      if (mode === 'signUp') {
        const pokemonsStart = await fetch(
          'https://reactmarathon-api.herokuapp.com/api/pokemons/starter',
        ).then(res => res.json());

        for (const item of pokemonsStart.data) {
          await fetch(
            `https://pokemon-game-23b5e-default-rtdb.europe-west1.firebasedatabase.app/${response.localId}/pokemons.json/?auth=${response.idToken}`,
            {
              method: 'POST',
              body: JSON.stringify(item),
            },
          );
        }
      }

      localStorage.setItem('idToken', response.idToken);
      NotificationManager.success('User registered', 'Success!');
      dispatch(getUserUpdateAsync());
      handleClickLogin();
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
