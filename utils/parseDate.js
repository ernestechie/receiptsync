export const parseDate = (date) => {
  return `${new Date(date).toLocaleDateString('default', {
    month: 'long',
  })} ${new Date(date).getDate()}, ${new Date(date).getUTCFullYear()}`;
};
