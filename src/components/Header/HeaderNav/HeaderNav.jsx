import React, { Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Backdrop from '../../../UI/Backdrop/Backdrop';
const HeaderNav = (props) => {
  const pathname = props.location.pathname;
  return (
    <Fragment>
      <Backdrop show={props.show} clickHandler={props.hideNav} />
      <ul className={props.show ? 'nav show' : 'nav'}>
        <li className="nav__item">
          <NavLink
            className="nav__link"
            to={
              props.role === 'admin'
                ? `${pathname}/all-articles`
                : `${pathname}/public-articles`
            }>
            {props.role === 'admin' ? 'all articles' : 'public articles'}
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav__link" to={`${pathname}`}>
            Dashboard
          </NavLink>
        </li>
        {props.role === 'admin' ? (
          <li className="nav__item">
            <NavLink className="nav__link" to={`${pathname}/all-users`}>
              users
            </NavLink>
          </li>
        ) : null}
        <li className="nav__item">
          <NavLink className="nav__link" to="/logout">
            Logout
          </NavLink>
        </li>
      </ul>
    </Fragment>
  );
};

export default withRouter(HeaderNav);
