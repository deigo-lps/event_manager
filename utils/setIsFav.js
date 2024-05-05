const setIsFav = (events, id) => {
  for (let i = 0; i < events.length; i++)
    if (events[i].id === id) {
      events[i].isFav = !events[i].isFav;
      break;
    }
};

export default setIsFav;
