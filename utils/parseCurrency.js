export const parseCurrency = (amount) => {
  return amount.toLocaleString();
};

export const parseNigerianNaira = (value) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(value);
