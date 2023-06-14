import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectIsLoggedIn } from 'redux/auth/authSlice';

export default function PrivateRoute({ children, fallbackRoute = '/' }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <>
      {isLoggedIn ? (
        children
      ) : (
        <>
          <Navigate to={fallbackRoute} replace={true} />
        </>
      )}
    </>
  );
}
