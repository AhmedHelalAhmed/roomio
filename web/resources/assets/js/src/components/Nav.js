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
      <Link to="/" >
        <h1></h1>
      </Link>
    </div>
    {
      !window.user ? 
        <div>
          <Bookmark to="/login" content="Login" />
          <Bookmark to="/register" content="Register" />
        </div>
        :
        <div>
        <div className="nameAndLog">
          <Bookmark 
            to={'/user/'+window.user.username}
            content={window.user.username} 
          />
          <a className="logout" href="/logout">logout</a>
          </div>
          <span className="createRoom">
            <Bookmark
              to={'/newroom'}
              content="+ Room"
            />
          </span>
          <span className="createRoom">
            <Bookmark
              to={'/newtopic'}
              content="+ Topic"
            />
          </span>
        </div>
    }
    <hr className="seperator" />
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