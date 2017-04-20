import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { authGET } from '../shared/utils/authAxios';
import Loading from './reusable/Loading';
import Search from './Search';
const Bookmark = ({ to, content }) => (
  <div className="bookmark">
    <Link to={to}>
      {content}
    </Link>
  </div>
);

class Nav extends Component {
  state = {
    rooms: [],
    loading: false,
    input: "",
    resultsObj: [],
  };

  onChange = e => {
    this.setState({input: e.target.value})
    const resultsObj = this.state.rooms.filter(currRoom => {
      const regex = new RegExp(e.target.value, 'gi');
      return currRoom.name.match(regex);
    });
    this.setState({resultsObj});
  }

  submit = e => {
    e.preventDefault();
  }

  componentDidMount() {
    this.setState({ loading: true });
    authGET('/api/room').then(res => {
      this.setState({ loading: false });
      res => res.json();
      this.setState({ rooms: res.data.rooms });
    });
  }

  render() {
    return (
      <div className="side-nav">
        <div className="logoBox">
          <Link to="/" className="mlogo">
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
                  to={'/user/' + window.user.username}
                  content={window.user.username}
                />
                <a className="logout" href="/logout">logout</a>
              </div>
              <span className="createRoom">
                <Bookmark to={'/newroom'} content="+ Room" />
              </span>
              <span className="createRoom">
                <Bookmark to={'/newtopic'} content="+ Topic" />
              </span>
            </div>}
        <hr className="seperator" />
        {this.state.loading
          ? <div>
              <Search 
                input={this.state.input}
                rooms={this.state.rooms} 
                disab={true} 
                onChange={this.onChange}
                submit={this.submit}
              />
              <Loading name="sidebar" />
            </div>
          : <div>
              <Search 
                input={this.state.input}
                rooms={this.state.rooms} 
                disab={false}
                onChange={this.onChange}
                submit={this.submit}
              />
              {this.state.resultsObj.length != 0 ? 
                this.state.resultsObj.map((val, index) => {
                return (
                  <Bookmark
                    to={`/room/${val.name}`}
                    content={val.name}
                    key={index}
                  />
                );
              }) : 
            this.state.rooms.map((val, index) => {
                return (
                  <Bookmark
                    to={`/room/${val.name}`}
                    content={val.name}
                    key={index}
                  />
                );
              })
          }
            </div>}
      </div>
    );
  }
}

Nav.PropTypes = {
  locations: PropTypes.object,
};

export default Nav;
