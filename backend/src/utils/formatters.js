export const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

export const formatDateTime = (date) => {
  if (!date) return null;
  return new Date(date).toISOString();
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(amount);
};

export const parseDateFromDDMMYYYY = (dateStr) => {
  if (!dateStr) return null;
  const [day, month, year] = dateStr.split('-');
  return `${year}-${month}-${day}`;
};

export const parseDecimal = (value) => {
  if (!value) return 0;
  return parseFloat(value.toString().replace(',', '.'));
};
