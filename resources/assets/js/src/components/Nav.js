import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const Bookmark = ({ to, content }) => (
  <div className="bookmark">
    <Link to={to} >
      {content}
    </Link>
  </div>
);

const Nav = props => (
  <div className="side-nav">
    <div className="logoBox">
      <h1></h1>
    </div>
    {
      !window.user ? 
        <div>
          <Bookmark to="/login" content="Login" />
          <Bookmark to="/register" content="Register" />
        </div>
        :
        <div className="bookmark">
          {window.user.username}
        </div>
    }
    <hr />
    <Bookmark to="/room/javascript" content="Javascript" />
    <Bookmark to="/room/politics" content="Politics" />
    <Bookmark to="/room/gifs" content="Gifs" />
    <Bookmark to="/room/photography" content="Photography" />
    <Bookmark to="/room/movies" content="Movies" />
    <Bookmark to="/room/programming" content="Programming" />
    <Bookmark to="/room/music" content="Music" />
    <Bookmark to="/room/hiphop" content="HipHop " />
    <Bookmark to="/room/news" content="News" />
    <Bookmark to="/room/gaming" content="Gaming" />
  </div>
);

Nav.PropTypes = {
  locations: PropTypes.object,
};

export default Nav;