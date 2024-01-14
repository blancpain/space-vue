export const formatDate = (inputDate: Date): string => {
  const year: number = inputDate.getFullYear();
  const month: string = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day: string = String(inputDate.getDate()).padStart(2, '0');

  const formattedDate: string = `${year}-${month}-${day}`;

  return formattedDate;
};
