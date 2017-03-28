import React, { Component } from 'react';
import validator from 'validator';
import { validateField, validateForm } from '../../shared/utils/validation';

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

    createErrorsFromResponse = (data) => {
      const errors = Object.keys(data).reduce((prev, fieldName) => {
        prev[fieldName] = data[fieldName].pop();
        return prev;
      }, {});
      this.setState({
        errors: {
          ...this.state.errors,
          ...errors,
        },
      });
    }

    setFields = (fields) => {
      this.setState({
        fields: {
          ...this.state.fields,
          ...fields
        }
      });
    }
    
    getEscapedFields = (fields = this.state.fields) => {
      return Object.keys(fields).reduce((prev, curr) => {
        prev[curr] = validator.stripLow(fields[curr]);
        return prev;
      }, {});
    }

    render() {
      return (
        <Form
          {...this.props}
          {...this.state}
          onChange={this.onChange}
          validateFieldOnBlur={this.validateFieldOnBlur}
          validateForm={this.validateForm}
          createErrorsFromResponse={this.createErrorsFromResponse}
          setFields={this.setFields}
          getEscapedFields={this.getEscapedFields}
        />
      );
    }
  }
};

export default MakeForm;