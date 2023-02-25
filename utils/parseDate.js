export const parseDate = (date) => {
  return `${new Date(date).toLocaleDateString('default', {
    month: 'short',
  })} ${new Date(date).getDate()}, ${new Date(date).getUTCFullYear()}`;
};
