import React from 'react';
import { useDispatch } from 'react-redux';
import { userLogOut } from '../redux/slices/loginSlice';
import { Link, NavLink } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function Navigation({ user }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (user.firstName) {
      localStorage.removeItem('token');
    }
    dispatch(userLogOut());
    window.location = '/login';
  };

  return (
    <div className="shadow-sm bg-white rounded">
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <FaHome />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
            </ul>
            {user.firstName ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    {user.firstName} {user.lastName}
                  </NavLink>
                </li>
              </ul>
            ) : null}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
