import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router';
import { authPOST } from '../shared/utils/authAxios';
import MakeForm from './HOCs/MakeForm';
import FormError from './reusable/FormError';

class CreateTopic extends Component {
  state = { error: null, loading: null };

  componentWillMount() {
    this.props.setFields({
      room_name: this.props.location.query.room
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    authPOST(`/api/topic`, { ...this.props.fields })
      .then((res) => {
        const { topic } = res.data;
       window.location = `/room/${topic.room_name}/topic/${topic.ref}`
      })
      .catch((err) => {
        console.log(err.response)
        if (err.response.data) {
          this.props.createErrorsFromResponse(err.response.data.messages);
        }
        this.setState({ error: 'An error has occured' });
      });
  }

  render() {
    const { fields, errors } = this.props;
    document.title = "Create Topic"
    return (
      <div className="outerFormContainer">
        <div className="formContainer">
          <form onSubmit={this.onSubmit} className="form">
            <h1>Create a Topic</h1>
            <label htmlFor="title">Room Name: </label>
            <input
              name="room_name"
              type="text"
              onChange={this.props.onChange}
              onBlur={this.props.validateFieldOnBlur}
              value={fields.room_name}
              className="formInput"
            />
            <FormError error={errors.room_name} />
            <label htmlFor="title">Topic Title: </label>
            <input
              name="title"
              type="text"
              onChange={this.props.onChange}
              onBlur={this.props.validateFieldOnBlur}
              value={fields.title}
              className="formInput"
            />
            <FormError error={errors.title} />
            <label htmlFor="description">Topic Description: </label>
            <textarea
              name="description"
              type="text"
              rows="8" cols="50"
              onChange={this.props.onChange}
              value={fields.description}
              className="formInput"
            />
            <FormError error={errors.description} />
            <div className="buttonContainer">
                <button className="formButton" >Create!</button>
            </div>
            <FormError error={this.state.error} />
          </form>
        </div>
      </div>
    ); 
  }
}

const fields = ['room_name', 'name', 'title', 'description'];
const rules = {
  room_name: 'required',
  name: 'required',
  title: 'required',
  description: 'required',
};

export default MakeForm(fields, rules)(CreateTopic);