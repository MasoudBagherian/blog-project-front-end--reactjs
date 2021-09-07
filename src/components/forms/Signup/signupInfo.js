export const SIGNUP_INFO = {
  firstname: {
    focused: false,
    value: '',
    validation: {
      isRequired: true,
      minLength: 2,
      isName: true,
      defaultErrMsg: 'First name is required',
      mainErrMsg:
        'First name should have at least 2 characters and contains only space and alphabet characters',
    },

    errMsg: null,
    isValid: false,
    touched: false,
  },
  lastname: {
    focused: false,
    value: '',
    validation: {
      isRequired: true,
      minLength: 2,
      isName: true,
      defaultErrMsg: 'Last name is required',
      mainErrMsg:
        'Last name should have at least 2 characters and contains only space and alphabet characters',
    },

    errMsg: null,
    isValid: false,
    touched: false,
  },
  email: {
    focused: false,
    value: '',
    validation: {
      isRequired: true,
      isEmail: true,
      defaultErrMsg: 'Email is required',
      mainErrMsg: 'Please enter a valid E-Mail',
    },

    errMsg: null,
    isValid: false,
    touched: false,
  },
  username: {
    focused: false,
    value: '',
    validation: {
      isRequired: true,
      minLength: 8,
      maxLength: 20,
      defaultErrMsg: 'Username is required',
      mainErrMsg: 'Username should have between 8 and 20 characters',
    },

    errMsg: null,
    isValid: false,
    touched: false,
  },
  password: {
    focused: false,
    value: '',
    validation: {
      isRequired: true,
      minLength: 8,
      maxLength: 20,
      isPassword: true,
      defaultErrMsg: 'Password is required',
      mainErrMsg:
        'Password should have between 8 and 20 characters and only alphabet and numeric characters and contain at least one capital letter and at least one small letter and at least one numeric character',
    },

    errMsg: null,
    isValid: false,
    touched: false,
  },
  passwordConfirm: {
    focused: false,
    value: '',
    isValid: false,
    errMsg: null,
    touched: false,
  },
  image: {
    isValid: true,
    data: null,
  },
};
