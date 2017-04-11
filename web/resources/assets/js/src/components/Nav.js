import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { authGET } from "../shared/utils/authAxios";

const Bookmark = ({ to, content }) => (
  <div className="bookmark">
    <Link to={to}>
      {content}
    </Link>
  </div>
);

class Nav extends Component {
  state = {
    rooms: []
  };

  componentDidMount() {
    authGET("/api/room").then(res => {
      res => res.json();
      this.setState({ rooms: res.data.rooms });
    });
  }

  render() {
    return (
      <div className="side-nav">
        <div className="logoBox">
          <Link to="/" className='mlogo'>
            <h1 />
          </Link>
        </div>
        {!window.user
          ? <div>
              <Bookmark to="/login" content="Login" />
              <Bookmark to="/register" content="Register" />
            </div>
          : <div>
              <div className="nameAndLog">
                <Bookmark
                  to={"/user/" + window.user.username}
                  content={window.user.username}
                />
                <a className="logout" href="/logout">logout</a>
              </div>
              <span className="createRoom">
                <Bookmark to={"/newroom"} content="+ Room" />
              </span>
              <span className="createRoom">
                <Bookmark to={"/newtopic"} content="+ Topic" />
              </span>
            </div>}
        <hr className="seperator" />
        {this.state.rooms.map((val, index) => {
          return (
            <Bookmark to={`/room/${val.name}`} content={val.name} key={index} />
          );
        })}
      </div>
    );
  }
}

Nav.PropTypes = {
  locations: PropTypes.object
};

export default Nav;
