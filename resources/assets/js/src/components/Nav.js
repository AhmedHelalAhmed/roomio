import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const Nav = props => {
  return (
    <div className="side-nav">
      <div className="logoBox">
        <h1></h1>
      </div>
      <div className="bookmark">
        <Link to="/room/javascript" >
          Javascript
        </Link>
      </div>
      <div className="bookmark">
        <Link to="/room/politics">
          Politics
        </Link>
      </div>
    </div>
  );
};

Nav.PropTypes = {
  locations: PropTypes.object,
};

export default Nav;