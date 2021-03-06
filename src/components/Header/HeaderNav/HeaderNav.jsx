import React, { Fragment } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import Backdrop from '../../../UI/Backdrop/Backdrop';
const HeaderNav = (props) => {
  const match = useRouteMatch();
  const path = match.path;
  return (
    <Fragment>
      <Backdrop show={props.show} clickHandler={props.hideNav} />
      <ul className={props.show ? 'nav show' : 'nav'}>
        <li className="nav__item">
          <NavLink
            className="nav__link"
            to={
              props.role === 'admin'
                ? `${path}/all-articles`
                : `${path}/public-articles`
            }
            onClick={props.hideNav}>
            {props.role === 'admin' ? 'all articles' : 'public articles'}
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            exact
            className="nav__link"
            to={`${path}`}
            onClick={props.hideNav}>
            Dashboard
          </NavLink>
        </li>
        {props.role === 'admin' ? (
          <li className="nav__item">
            <NavLink
              className="nav__link"
              to={`${path}/all-users`}
              onClick={props.hideNav}>
              users
            </NavLink>
          </li>
        ) : null}
        <li className="nav__item">
          <NavLink className="nav__link" to="/logout" onClick={props.hideNav}>
            Logout
          </NavLink>
        </li>
      </ul>
    </Fragment>
  );
};

export default HeaderNav;
