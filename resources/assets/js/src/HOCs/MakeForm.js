import React, { Component } from 'react';
import { validateField, validateForm } from '../shared/utils/validation';

const MakeForm = (fields, validationRules) => (Form) => {
  return class extends Component {
    state = {
      fields: fields.reduce((prev, curr) => {
        prev[curr] = '';
        return prev;
      }, {}),
      errors: {},
    };

    onChange = (e) => {
      const { name: fieldName, value: fieldValue } = e.target;
      this.setState({
        fields: {
          ...this.state.fields,
          [fieldName]: fieldValue,
        },
      });
    }

    validateFieldOnBlur = (e) => {
      const { name: fieldName, value: fieldValue } = e.target;
      const error = validateField(
        fieldName,
        fieldValue,
        validationRules[fieldName],
        this.state.fields
      );

      this.setState({
        errors: {
          ...this.state.errors,
          [fieldName]: error,
        },
      });
    }

    validateForm = () => {
      this.setState({
        errors: {
          ...this.state.errors,
          ...validateForm(this.state.fields, validationRules),
        },
      });
    }

    createErrors = (errors) => {
      this.setState({
        errors: {
          ...this.state.errors,
          ...errors,
        },
      });
    }

    render() {
      return (
        <Form
          {...this.props}
          {...this.state}
          onChange={this.onChange}
          validateFieldOnBlur={this.validateFieldOnBlur}
          validateForm={this.validateForm}
          createErrors={this.createErrors}
        />
      );
    }
  }
};

export default MakeForm;