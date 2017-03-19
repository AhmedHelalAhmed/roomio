import React from 'react'
import TopicList from './TopicList';
import { Link } from 'react-router';

const Profile = ({username, profile}) => {
  return(
    <div className="sharedContainer">
      <div className="sharedTitleSep usernameOuter">
        <h1 className="username">{username}</h1>
        <span className="profileDate">created on {profile.created_at}</span>
      </div>
      <div className="profileScore spaceAround">
        {
          profile.rooms.length != 1 ? 
          <span>Admin of {profile.rooms.length} Rooms</span>
           : <span>Admin of {profile.rooms.length} Room</span>
        }
        <span>Topics - {profile.topics.length}</span>
      </div>
      <hr className="profileSeperator" />
      <div className="profileBody spaceAround">
        <ul className="roomsList flexSplit">
          {
            profile.rooms.map((info, key) => 
            <li className="listNode flexSplit">
              <Link to={'/room/' + info.name}>
              {info.title}
              </Link>
            </li>
            )}
        </ul>
          <ul className="topicsList flexSplit">
          {
            profile.topics.map((topic, key) => 
            <li className="listNode flexSplit">
              <Link to={`/room/${topic.room_name}/topic/${topic.ref}`}>
              {topic.title}
              </Link>
            </li>
            )}
        </ul>
      </div>
    </div>
  )
}

export default Profile;