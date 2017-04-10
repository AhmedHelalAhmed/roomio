import React from 'react';

const FormError = ({ error }) => {
  if (!error) return null;
  return (
    <span className="form-error">
      {error}
    </span>
  );
};

export default FormError;
