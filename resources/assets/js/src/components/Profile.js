import React from 'react'

const Profile = ({username, profile}) => {
  return(
    <div className="sharedContainer">
      <div className="sharedTitleSep">
        <h1><span>{username}</span></h1>
      </div>
      <span>Rooms - {profile.rooms.length}</span>
      <span>Topics - {profile.topics.length}</span>
    </div>
  )
}

export default Profile;