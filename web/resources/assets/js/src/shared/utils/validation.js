import validator from 'validator';

validator.required = fieldVal => !!fieldVal;

validator.isPassword = fieldVal => validator.isLength(fieldVal, {
  min: 4,
});

validator.isLower = fieldVal => validator.isLowercase(fieldVal);

validator.sameAs = (fieldVal, [otherFieldName], allFields) => fieldVal === allFields[otherFieldName];

const errorMessages = {
  required: 'This field is required.',
  isEmail: 'This field must be a valid email address.',
  isPassword: 'Password must be over four characters.',
  isLower: 'Room names must be lowercase.',
  sameAs: 'Passwords must be the same',
};

const _validator = (rule, fieldVal, allFields) => {
  if (rule.includes(':')) {
    const [ruleName, ...args] = rule.split(':');
    console.log(ruleName, args);
    const isValid = validator[ruleName](fieldVal, args, allFields);
    return { isValid, rule: ruleName };
  }
  const isValid = validator[rule](fieldVal);
  return { isValid, rule };
};

export const validateField = (
  fieldName,
  fieldVal,
  fieldValidation,
  allFields,
) => {
  const rules = fieldValidation.split('|');
  const errors = rules
    .map(rule => _validator(rule, fieldVal, allFields))
    .filter(elem => !elem.isValid);
  if (errors.length) return errorMessages[errors.pop().rule];
  return null;
};

export const validateForm = (fields, validationRules) =>
  Object.keys(fields).reduce(
    (errors, fieldName) => {
      errors[fieldName] = validateField(
        fieldName,
        fields[fieldName],
        validationRules[fieldName],
      );
    }, {});
