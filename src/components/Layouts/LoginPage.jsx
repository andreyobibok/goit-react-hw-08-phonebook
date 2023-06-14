import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserOp } from 'redux/auth/ops';
import style from './RegisterPage.module.css';

const INIT_CREDS = {
  email: '',
  password: '',
};

export default function RegisterPage(props) {
  const [credentials, setCredentials] = useState({ ...INIT_CREDS });

  const dispatch = useDispatch();

  function onInputChange(event) {
    const { name, value } = event.currentTarget;
    setCredentials({ ...credentials, [name]: value });
  }

  function onFormSubmit(event) {
    event.preventDefault();
    dispatch(loginUserOp(credentials));
    setCredentials({ ...INIT_CREDS });
  }

  return (
    <form action="submit" onSubmit={onFormSubmit} className={style.form}>
      <label className={style.label}>
        E-mail
        <input
          type="email"
          name="email"
          required
          onChange={onInputChange}
          value={credentials.email}
          className={style.input}
        />
      </label>

      <label className={style.label}>
        Password
        <input
          type="password"
          name="password"
          required
          onChange={onInputChange}
          value={credentials.password}
          className={style.input}
        />
      </label>

      <button type="submit" className={style.button}>
        Log in
      </button>
    </form>
  );
}
