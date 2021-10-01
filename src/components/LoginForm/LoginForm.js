import { useEffect, useState } from 'react';

import Input from '../Input/Input';

import styles from './LoginForm.module.css';

const LoginForm = ({ onSubmit, isOpenModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigninMode, setIsSigninMode] = useState(true);

  useEffect(() => {
    resetForm();
  }, [isOpenModal]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    const mode = isSigninMode ? 'signIn' : 'signUp';
    onSubmit && onSubmit(mode, { email, password });
    resetForm();
  };

  const toggleMode = () => {
    setIsSigninMode(prevstate => !prevstate);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div>
        <Input
          value={email}
          name="email"
          label="Email"
          onChange={evt => setEmail(evt.target.value)}
          required
        />
        <Input
          type="password"
          value={password}
          name="password"
          label="Password"
          onChange={evt => setPassword(evt.target.value)}
          required
        />
      </div>
      <div className={styles.buttonWrap}>
        <button type="submit">{isSigninMode ? 'SIGNIN' : 'SIGNUP'}</button>
        <button className={styles.toggleBtn} type="button" onClick={toggleMode}>
          {isSigninMode ? 'Register?' : 'Login?'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
