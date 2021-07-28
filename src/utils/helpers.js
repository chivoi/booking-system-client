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
  ;const months = {"01":"Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06":"Jun", "07":"Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec" }
  return `${dateArray[2]} ${months[dateArray[1]]} ${dateArray[0]}`
}

export const findDateById = (id, objects) => {
  if (!id || !objects) return null;
  let instance = objects.find(i => i.id === id);
  return formatDate(instance.date);
}