import React from 'react';
import { Link } from 'react-router';
import ReactPlayer from 'react-player'
import getUrls from 'get-urls'
import VideoPlayer from './Video';

const getSentUrls = (url) => {
  const val = getUrls(url).values().next().value;
  if(matchYoutubeUrl(val)) { 
      return val;
    }
    return false;
}

const matchYoutubeUrl = (url) => {
  console.log('memes', url);
  const youtube = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
  const vimeo = /^(http\:\/\/|https\:\/\/)?(www\.)?(vimeo\.com\/)([0-9]+)$/;
  //const soundcloud =  /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/;
  const streamable =  /^https?:\/\/(streamable\.com)\/(.*)$/;
  const vidme =  /^https?:\/\/(vid\.me)\/(.*)$/;
  if(youtube.test(url) || vimeo.test(url) || streamable.test(url) || vidme.test(url) /*|| soundcloud.test(url)*/){  
      return true;
  }
  return false;
}

const Message = ({ messages, message, index, html }) => {
  const isFirst = index === 0;

  return (
    <p className="chatBubble" key={index}>
      {   isFirst || messages[index - 1].user.username !== message.user.username ?
          <strong className="user">
            <Link to={'/user/' + message.user.username}>
              {message.user.username}:
            </Link>
          </strong> : null
      }
      {
        getSentUrls(message.content) ? 
        <span>
          <span
            style={{ whiteSpace: 'pre-wrap' }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <VideoPlayer getSentUrls={getSentUrls} message={message} />
        </span> : 
        <span
          style={{ whiteSpace: 'pre-wrap' }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      }
    </p>
  );
};




export default Message;
