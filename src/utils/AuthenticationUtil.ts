import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  EMAIL_PATTERN,
} from "../global_variable/global_constant";

const AuthenticationUtil = {
  isValidPasswordLength: (password: string) => {
    return (
      password.length >= MIN_PASSWORD_LENGTH &&
      password.length <= MAX_PASSWORD_LENGTH
    );
  },
  confirmPassword: (password: string, repassword: string) => {
    return (
      AuthenticationUtil.isValidPasswordLength(password) &&
      password === repassword
    );
  },
  emailFormat: (email: string) => {
    const invalidEmail = EMAIL_PATTERN.test(email);
    return invalidEmail;
  },
};

export default AuthenticationUtil;
