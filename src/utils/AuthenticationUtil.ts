import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  EMAIL_PATTERN,
} from "./global_constant";

const AuthenticationUtil = {
  isValidPasswordLength: (password: String) => {
    return (
      password.length >= MIN_PASSWORD_LENGTH &&
      password.length <= MAX_PASSWORD_LENGTH
    );
  },
  confirmPassword: (password: String, repassword: String) => {
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
