export interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
}

export interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}

export const validateEmail = (email: string): string | undefined => {
  if (!email) {
    return "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    return "Please enter a valid email address";
  }
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return undefined;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | undefined => {
  if (!confirmPassword) {
    return "Please confirm your password";
  } else if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return undefined;
};

export const validateName = (name: string): string | undefined => {
  if (!name) {
    return "Name is required";
  } else if (name.length < 2) {
    return "Name must be at least 2 characters";
  }
  return undefined;
};

export const validateSignInForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  errors.email = validateEmail(formData.email);
  errors.password = validatePassword(formData.password);

  // Remove undefined values
  Object.keys(errors).forEach(key => {
    if (errors[key as keyof FormErrors] === undefined) {
      delete errors[key as keyof FormErrors];
    }
  });

  return errors;
};

export const validateSignUpForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  errors.name = validateName(formData.name || '');
  errors.email = validateEmail(formData.email);
  errors.password = validatePassword(formData.password);
  
  if (formData.confirmPassword !== undefined) {
    errors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);
  }

  // Remove undefined values
  Object.keys(errors).forEach(key => {
    if (errors[key as keyof FormErrors] === undefined) {
      delete errors[key as keyof FormErrors];
    }
  });

  return errors;
}; 