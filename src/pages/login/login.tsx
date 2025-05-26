import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { loginUser, removeError } from '../../slices/userSlice';
import { setCookie } from '../../utils/cookie';
import { Preloader } from '@ui';
export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(removeError());
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password }))
        .unwrap()
        .then((payload) => {
          localStorage.setItem('refreshToken', payload.refreshToken);
          setCookie('accessToken', payload.accessToken);
        });
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
