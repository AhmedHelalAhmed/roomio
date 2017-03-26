import React from 'react';
import { Link } from 'react-router';

const Profile = ({ username, profile }) => {
  return (
    <div className="sharedContainer">
      <div className="sharedTitleSep usernameOuter">
        <h1 className="username">{username}</h1>
      </div>
      <div className="profileBody spaceAround">

        <ul className="roomsList flexSplit">
        {
          profile.rooms.length != 1 ? 
          <span>Admin of {profile.rooms.length} Rooms</span>
           : <span>Admin of {profile.rooms.length} Room</span>
        }
        <hr className="profileSeperator" />
          {
            profile.rooms.map((info, key) =>
            <li className="listNode flexSplit" key={key}>
              <Link to={'/room/' + info.name}>
                {info.title}
              </Link>
            </li>)}
        </ul>
          <ul className="topicsList flexSplit">
          <span>Topics - {profile.topics.length}</span>
          <hr className="profileSeperator" />
          {
            profile.topics.map((topic, key) => 
              <li className="listNode flexSplit" key={key}>
                <Link to={`/room/${topic.room_name}/topic/${topic.ref}`}>
                  {topic.title}
                </Link>
              </li>
            )}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
