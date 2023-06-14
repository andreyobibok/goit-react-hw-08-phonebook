import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUserOp } from 'redux/auth/ops/registerUserOp';
import style from './RegisterPage.module.css';

const INIT_CREDS = {
  name: '',
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

  async function onFormSubmit(event) {
    event.preventDefault();
    dispatch(registerUserOp(credentials));
    setCredentials({ ...INIT_CREDS });
  }

  return (
    <form action="submit" onSubmit={onFormSubmit} className={style.form}>
      <label htmlFor="name" className={style.label}>
        Name
        <input
          type="text"
          name="name"
          required
          onChange={onInputChange}
          value={credentials.name}
          className={style.input}
        />
      </label>

      <label htmlFor="email" className={style.label}>
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

      <label htmlFor="password" className={style.label}>
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
        Register
      </button>
    </form>
  );
}
