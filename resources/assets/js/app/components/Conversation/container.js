import { connect } from 'react-redux';
import Conversation from './component';

const mapStateToProps = state => ({
  conversation: state.conversation,
});

const ContainerConversation = connect(
  mapStateToProps,
)(Conversation);

export default ContainerConversation;
