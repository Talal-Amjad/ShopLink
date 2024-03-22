export const startDate = () => {
  const today = new Date();
  const dates = [];
  for (let i = 0; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedDate = date.toISOString().split('T')[0];
    dates.push({ value: formattedDate, label: date.toLocaleDateString() });
  }
  return dates;
};

export const endDate = (selectedStartDate) => {
  const rangeOptions = [];
  if (selectedStartDate) {
    const startDate = new Date(selectedStartDate);
    const currentDate = new Date();

    startDate.setDate(startDate.getDate());
    while (startDate <= currentDate) {
      rangeOptions.push({
        value: startDate.toISOString().split('T')[0],
        label: startDate.toLocaleDateString()
      });
      startDate.setDate(startDate.getDate() + 1);
    }
    
  }

  return rangeOptions;
};
