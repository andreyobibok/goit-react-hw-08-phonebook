import { NavLink } from 'react-router-dom';
import propTypes from 'prop-types';
import style from './NavBar.module.css';

export function navLinkStyle(isActive = false, disabled = false) {
  return (
    style['nav-link'] +
    (!disabled && isActive ? ' ' + style['nav-link--active'] : '') +
    (disabled ? ' ' + style['nav-link--disabled'] : '')
  );
}

export default function NavBar({ children, isLoggedIn, ...props }) {
  return (
    <nav className={style.navigation}>
      <ul>
        <li>
          {isLoggedIn ? (
            <NavLink
              end
              to={'/contacts'}
              className={({ isActive }) => navLinkStyle(isActive)}
            >
              Phonebook
            </NavLink>
          ) : (
            <p className={navLinkStyle(false, true)}>Phonebook</p>
          )}
        </li>
      </ul>
      {children}
    </nav>
  );
}

NavBar.propTypes = {
  isLoggedIn: propTypes.bool.isRequired,
};
