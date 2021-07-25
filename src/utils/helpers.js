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

export const paginate = (array, currentPage, resultsPerPage) => {
  let page = currentPage || 1,
	perPage = resultsPerPage || 28,
	offset = (page - 1) * perPage,

	paginatedItems = array.slice(offset).slice(0, resultsPerPage),
	totalPages = Math.ceil(array.length / perPage);

	return {
		page: page,
		perPage: perPage,
		prePage: page - 1 ? page - 1 : null,
		nextPage: (totalPages > page) ? page + 1 : null,
		total: array.length,
		totalPages: totalPages,
		data: paginatedItems
	};
}

export const getMonth = array => {
  let dates = array.map(obj => obj.date.split("-")[1]);
  let uniqueDates = [...new Set(dates)];
  const months = [ "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December" ];
  return uniqueDates.map(date => {
    return months[parseInt(date.substr(1)) - 1]
  });
}

export const getYear = array => {
  let years = array.map(obj => obj.date.split("-")[0]);
  return [...new Set(years)];
}