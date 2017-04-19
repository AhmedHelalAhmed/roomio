import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

const Profile = ({ username, profile }) => (
  <div className="profileOuter">
    <div className="bannerOuter">
      <div className='bannerInner'>
        <span className='profCirc'>
          <h1 className="username">{username[0]}</h1>
        </span>
        <span className='titleDisplayProfile'>
          <h1 className='usernameCard'>{username}</h1>
          <h4 className="createdAt">Joined {moment(profile.created_at).format('MMMM Do, YYYY')}</h4>
        </span>
      </div>
    </div>
    <div className="sharedBody spaceAround fixedBody">
      <ul className="roomsList flexSplit">
        {profile.rooms.length != 1
            ? <span>Admin of {profile.rooms.length} Rooms</span>
            : <span>Admin of {profile.rooms.length} Room</span>}
        <hr className="profileSeperator" />
        {profile.rooms.map((info, key) => (
          <li className="listNode flexSplit" key={key}>
            <Link to={`/room/${info.name}`}>
              {info.title}
            </Link>
          </li>
          ))}
      </ul>
      <ul className="topicsList flexSplit">
        <span>Topics - {profile.topics.length}</span>
        <hr className="profileSeperator" />
        {profile.topics.map((topic, key) => (
          <li className="listNode flexSplit" key={key}>
            <Link to={`/room/${topic.room_name}/topic/${topic.ref}`}>
              {topic.title}
            </Link>
          </li>
          ))}
      </ul>
    </div>
  </div>
  );

export default Profile;
