export const n6 = new Intl.NumberFormat("en-us", {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 6
});

export const c2 = new Intl.NumberFormat('en-us', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

export const getEllipsesText = text =>
  `${text.substr(0, 4)}...${text.substr(text.length - 5, text.length)}`;

export const tokenValue = (value, decimals) =>
  decimals ? value / Math.pow(10, decimals) : value;

export const tokenValueText = (value, decimals, symbol) =>
  decimals ? `${n6.format(tokenValue(value, decimals))} ${symbol}` : `${value}`;