import React from 'react';
import FontAwesome from 'react-fontawesome';

const FormError = ({ error }) => {
  if (!error) return null;
  return (
    <span className="form-error">
      <FontAwesome 
        name='exclamation-circle' 
        className='errorIcon'
      />{error}
    </span>
  );
};

export default FormError;
