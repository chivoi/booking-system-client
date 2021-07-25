export const capitalize = string => {
  if (!string) return null;
  return string.slice(0,1).toUpperCase() + string.substr(1).split(/(?=[A-Z])/).join(" ")
}

export const nextId = (arr) => {
  if (arr.length === 0) return 1;
  return arr[arr.length -1].id + 1;
}

export const formatDate = date => {
  const dateArray = date.split("-");
  const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  return `${dateArray[2]} ${months[dateArray[1].substr(1)-1]} ${dateArray[0]}`
}

export const findDateById = (id, objects) => {
  let instance = objects.find(i => i.id === id);
  return formatDate(instance.date);
}