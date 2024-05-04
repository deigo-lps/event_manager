import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useReducer, useState } from "react";

const EventsContext = React.createContext({
  eventsState: [],
  addEvent: (event) => {},
  clearEvents: () => {},
  dispatchEvents: () => {},
  isLoading: false,
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
    case "init": {
      console.log(action.events[0].name);
      return action.events;
    }
  }
};

export const EventsContextProvider = (props) => {
  const [eventsState, dispatchEvents] = useReducer(eventsReducer, []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleInit = async () => {
      setIsLoading(true);
      const storageState = await AsyncStorage.getItem("events");
      if (storageState) dispatchEvents({ type: "init", events: JSON.parse(storageState) });
      setIsLoading(false);
    };
    handleInit();
  }, []);

  const addEvent = async (event) => {
    setIsLoading(true);
    dispatchEvents({ type: "add", event });
    const prevEventsString = await AsyncStorage.getItem("events");
    if (prevEventsString) {
      const prevEvents = JSON.parse(prevEventsString);
      await AsyncStorage.setItem("events", JSON.stringify([...prevEvents, event]));
      setIsLoading(false);
    } else {
      await AsyncStorage.setItem("events", JSON.stringify([event]));
      setIsLoading(false);
    }
  };

  const clearEvents = async () => {
    setIsLoading(true);
    dispatchEvents({ type: "clear" });
    await AsyncStorage.clear();
    setIsLoading(false);
  };

  return <EventsContext.Provider value={{ eventsState, addEvent, clearEvents, isLoading }}>{props.children}</EventsContext.Provider>;
};

export default EventsContext;
