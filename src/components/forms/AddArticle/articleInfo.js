export const ARTICLE_INFO = {
  title: {
    value: '',
    validation: {
      isRequired: true,
      minLength: 5,
      defaultErrMsg: 'Title is required',
      mainErrMsg: 'Title should have at least 5 characters',
    },
    isValid: false,
    touched: false,
    focused: false,
    errMsg: null,
  },
  image: {
    isValid: true,
    data: null,
  },
  status: {
    isValid: true,
    value: 'public',
    focused: false,
  },
};