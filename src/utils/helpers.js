export const capitalize = string => {
  return string.slice(0,1).toUpperCase() + string.substr(1).split(/(?=[A-Z])/).join(" ")
}

export const nextId = (arr) => {
  if (arr.length === 0) return 1;
  return arr[arr.length -1].id + 1;
}