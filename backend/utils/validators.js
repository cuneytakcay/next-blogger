import validator from 'validator';

/**
 * Validate user registration data.
 * Ensures first name, last name, email, and password are valid.
 */
export const validateUserRegistration = ({
  firstName,
  lastName,
  email,
  password,
}) => {
  const errors = [];

  if (validator.isEmpty(firstName)) errors.push('First name cannot be empty');
  if (validator.isEmpty(lastName)) errors.push('Last name cannot be empty');
  if (!email || !validator.isEmail(email)) errors.push('Invalid email');
  if (
    password &&
    !validator.matches(
      password,
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
    )
  ) {
    errors.push(
      'Password must contain at least one number, one special character, and be at least 8 characters long'
    );
  }

  return errors;
};
