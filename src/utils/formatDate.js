const formatBordDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', options);
};

const formatInputDate = (dateString) => {
  const options = {
    second: '2-digit',
    minute: '2-digit',
    hour: '2-digit',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }; // DD MM YY HH MM SS
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', options);
};

export { formatBordDate, formatInputDate };
