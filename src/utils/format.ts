// Prizes are whole euros; the ticket price is not, and 2,50 € rounded to
// the euro would be a wrong number on a page about how much playing costs.
const wholeEuros = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const exactEuros = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatEuros = (amount: number) =>
  Number.isInteger(amount) ? wholeEuros.format(amount) : exactEuros.format(amount);

export const formatNumber = new Intl.NumberFormat("fr-FR").format;
