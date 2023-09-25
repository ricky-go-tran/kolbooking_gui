export const formatDate = (dateString: string) => {
  let date = new Date(dateString);
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedDate;
};
