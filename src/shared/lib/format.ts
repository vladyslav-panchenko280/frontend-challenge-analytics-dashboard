const numberFormatter = new Intl.NumberFormat("en-US");
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatNumber = (num: number): string => numberFormatter.format(num);

export const formatCurrency = (num: number): string => currencyFormatter.format(num);
