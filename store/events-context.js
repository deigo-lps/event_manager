import React, { useReducer } from "react";

const EventsContext = React.createContext({
  eventsState: [],
  dispatchEvents: () => {},
});

const eventsReducer = (state, action) => {
  switch (action.type) {
    case "clear": {
      return [];
    }
    case "add": {
      const newEvent = action.event;
      return [...state, newEvent];
    }
  }
};

export const EventsContextProvider = (props) => {
  const [eventsState, dispatchEvents] = useReducer(eventsReducer, []);
  return (
    <EventsContext.Provider value={{ eventsState, dispatchEvents }}>
      {props.children}
    </EventsContext.Provider>
  );
};

export default EventsContext;
