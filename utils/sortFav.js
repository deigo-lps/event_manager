const sortFav = (a, b) => {
  if (a.isFav && !b.isFav) {
    return -1;
  } else if (!a.isFav && b.isFav) {
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

export default sortFav;
