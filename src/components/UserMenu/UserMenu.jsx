import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectUserName, selectUserEmail } from 'redux/auth/authSlice';
import { logoutUserOp } from 'redux/auth/ops';
import Button from 'components/Button';
import style from './UserMenu.module.css';

export default function UserMenu(props) {
  const userEmail = useSelector(selectUserEmail);
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();

  async function logout() {
    dispatch(logoutUserOp());
  }

  return (
    <div className={style.container}>
      <p className={style.greeting}>
        Logged in as {userEmail}.
        <br />
        Hi, {userName}!
      </p>
      <Button type={'button'} onClick={logout} label={'Log out'} />
    </div>
  );
}
