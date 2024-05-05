const addBooking = ({ events, id, info }) => {
  for (let i = 0; i < events.length; i++)
    if (events[i].id === id) {
      events[i].bookings = events[i].bookings ? [...events[i].bookings, info] : [info];
      events[i].tickets = events[i].tickets - 1
      break;
    }
};

export default addBooking;
