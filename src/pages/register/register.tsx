import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  registerUser,
  removeError,
  selectorError
} from '../../slices/userSlice';
import { setCookie } from '../../utils/cookie';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const error = useSelector(selectorError);

  useEffect(() => {
    dispatch(removeError());
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await dispatch(registerUser({ email, name: userName, password }))
        .unwrap()
        .then((payload) => {
          localStorage.setItem('refreshToken', payload.refreshToken);
          setCookie('accessToken', payload.accessToken);
        });
    } catch (err) {}
  };

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
