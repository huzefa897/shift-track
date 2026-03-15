export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(Number(amount || 0));
}

export function formatHours(hours) {
  return `${Number(hours || 0).toFixed(2)} hrs`;
}