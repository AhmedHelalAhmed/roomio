import React, { Component } from 'react';
import { Link } from 'react-router';
import { authGET } from '../../../shared/utils/authAxios';
import styles from './styles.css';

class Conversations extends Component {
    state = {
        conversations: [],
        loading: false
    }

    componentWillMount() {
      authGET('/api/user/conversations')
          .then((res) => {
              let conversations = [];
              if (res.data.conversations.length) {
                conversations = res.data.conversations.map((convo) => {
                  const [user1, user2] = convo.users;
                  return {
                    name: user1.name != window.user.name ? `w/ ${user1.name}` : `w/ ${user2.name}`,
                    id: convo.id,
                  };
                });
              }
              this.setState({ conversations });
          })
          .catch((error) => {
              console.log(error);
          });
    }

    render() {
        return (
            <div className={styles.conversations}>
                <h1>Conversations</h1>
                <ul>
                {this.state.conversations.map((chat, index) => {
                    return (
                        <li key={index}>
                            <Link to={`conversation/${chat.id}`}>
                              {chat.name}
                            </Link>
                        </li>
                    );
                })}
                </ul>
            </div>
        );
    }
}

export default Conversations;