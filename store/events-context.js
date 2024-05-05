import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useReducer, useRef, useState } from "react";
import setIsFav from "../utils/setIsFav";

const EventsContext = React.createContext({
  eventsState: [],
  addEvent: (event) => {},
  clearEvents: () => {},
  toggleFav: (id) => {},
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
      return action.events;
    }
    case "toggleFav": {
      const newState = [...state];
      setIsFav(newState, action.id);
      return newState;
    }
  }
};

export const EventsContextProvider = (props) => {
  const [eventsState, dispatchEvents] = useReducer(eventsReducer, []);
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef(false);

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

  const toggleFav = async (id) => {
    if (!loadingRef.current) {
      loadingRef.current = true;
      dispatchEvents({ type: "toggleFav", id });
      const eventsString = await AsyncStorage.getItem("events");
      const events = JSON.parse(eventsString);
      setIsFav(events, id);
      await AsyncStorage.setItem("events", JSON.stringify(events));
      loadingRef.current = false;
    }
  };

  return <EventsContext.Provider value={{ eventsState, addEvent, clearEvents, isLoading, toggleFav }}>{props.children}</EventsContext.Provider>;
};

export default EventsContext;
