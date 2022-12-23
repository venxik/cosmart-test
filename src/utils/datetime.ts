export const getDate = (date: string) => {
  const temp = new Date(date);
  return temp.toLocaleDateString('id-ID');
};

export const getTime = (date: string) => {
  const temp = new Date(date);
  return temp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
};
