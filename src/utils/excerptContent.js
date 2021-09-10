import truncatise from 'truncatise';
const options = {
  TruncateBy: 'words',
  StripHTML: false,
};
export const excerptContent = (content, number) => {
  return truncatise(content, { ...options, TruncateLength: number });
};
