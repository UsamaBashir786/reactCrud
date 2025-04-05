// src/utils/formatPrice.js
// Format a price with currency symbol
export const formatPrice = (price, currency = '$') => {
  return `${currency}${parseFloat(price).toFixed(2)}`;
};