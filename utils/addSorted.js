const sort = (a, b) => {
  if (a.date < b.date) {
    return -1;
  } else if (a.date > b.date) {
    return 1;
  } else {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  }
};
const addSorted = (obj, array) => {
  let i = 0;
  while (i < array.length && sort(obj, array[i]) > 0) i++;
  array.splice(i, 0, obj);
};

export default addSorted;
