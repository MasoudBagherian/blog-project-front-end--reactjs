import truncatise from 'truncatise';
const isCapital = (char) => {
  return char >= 'A' && char <= 'Z';
};
const isSmall = (char) => {
  return char >= 'a' && char <= 'z';
};
const isAlpha = (char) => {
  return isCapital(char) || isSmall(char);
};
const isNumeric = (char) => {
  return !isNaN(char);
};
const hasCapital = (word) => {
  return word
    .trim()
    .split('')
    .some((char) => isCapital(char));
};
const hasSmall = (word) => {
  return word
    .trim()
    .split('')
    .some((char) => isSmall(char));
};
const hasNumeric = (word) => {
  return word
    .trim()
    .split('')
    .some((char) => isNumeric(char));
};

const isAlphaNumeric = (word) => {
  return word
    .trim()
    .split('')
    .every((char) => isNumeric(char) || isCapital(char) || isSmall(char));
};
const isPassword = (word) => {
  return (
    hasCapital(word) &&
    hasSmall(word) &&
    hasNumeric(word) &&
    isAlphaNumeric(word)
  );
};
const minWords = (value, number) => {
  const options = {
    TruncateBy: 'words',
    TruncateLength: 1000,
    StripHTML: false,
  };
  let text = truncatise(value, options);
  text = text.replace(/>/g, '> ');
  text = text.replace(/&nbsp;/g, ' ');
  text = truncatise(text, { ...options, StripHTML: true });
  text = text.split(' ').filter((el) => el !== '');
  return text.length >= number;
};
export const checkValidity = (value, validation) => {
  let isValid = true;
  let errMsg = null;
  let defaultErr = false;
  let checkRule;
  if (validation.isRequired) {
    checkRule = value.trim().length;
    isValid = checkRule && isValid;

    if (!checkRule) {
      defaultErr = true;
      errMsg = validation.defaultErrMsg;
    }
  }
  if (validation.minLength) {
    checkRule = value.trim().length >= validation.minLength;
    isValid = checkRule && isValid;
    if (!checkRule && !defaultErr) {
      errMsg = validation.mainErrMsg;
    }
  }
  if (validation.maxLength) {
    checkRule = value.trim().length <= validation.maxLength;
    isValid = checkRule && isValid;
    if (!checkRule && !defaultErr) {
      errMsg = validation.mainErrMsg;
    }
  }
  if (validation.isName) {
    checkRule = value
      .trim()
      .split('')
      .every((char) => isAlpha(char) || char === ' ');
    isValid = checkRule && isValid;
    if (!checkRule && !defaultErr) {
      errMsg = validation.mainErrMsg;
    }
  }
  if (validation.isEmail) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    checkRule = re.test(value.trim().toLowerCase());
    isValid = checkRule && isValid;
    if (!checkRule && !defaultErr) {
      errMsg = validation.mainErrMsg;
    }
  }
  if (validation.isPassword) {
    checkRule = isPassword(value);
    isValid = checkRule && isValid;
    if (!checkRule && !defaultErr) {
      errMsg = validation.mainErrMsg;
    }
  }
  if (validation.minWords) {
    checkRule = minWords(value, validation.minWords);
    isValid = checkRule && isValid;
    if (!checkRule && !defaultErr) {
      errMsg = validation.mainErrMsg;
    }
  }
  return { isValid, errMsg };
};

export const checkImageName = (image) => {
  let imageAlert = null;
  let isValid = true;
  const imageName = image.name;
  const imageFormat = imageName
    .split('.')
    .filter((item, index, arr) => index === arr.length - 1)
    .join('');
  const formats = ['png', 'jpg', 'jpeg'];
  if (!formats.includes(imageFormat)) {
    isValid = false;
    imageAlert = `File format is not supported. Only ${formats.join(
      ' and '
    )} are supported`;
  } else if (imageName.includes(' ')) {
    isValid = false;
    imageAlert =
      'File name should not has space character. Please change file name.';
  }
  return { isValid, imageAlert };
};
