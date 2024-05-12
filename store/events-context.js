import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useReducer, useRef, useState } from "react";
import setIsFav from "../utils/setIsFav";
import addBooking from "../utils/addBooking";
import addSorted from "../utils/addSorted";
import { Alert } from "react-native";

const EventsContext = React.createContext({
  eventsState: [],
  addEvent: (event) => {},
  clearEvents: () => {},
  toggleFav: (id) => {},
  deleteEvent: (id) => {},
  createBooking: ({ id, obj }) => {},
});

const eventsReducer = (state, action) => {
  switch (action.type) {
    case "init": {
      return action.events;
    }
    case "add": {
      const newEvent = action.event;
      const newState = [...state];
      addSorted(newEvent, newState);
      return newState;
    }
    case "delete": {
      return state.filter((event) => event.id !== action.id);
    }
    case "toggleFav": {
      const newState = [...state];
      setIsFav(newState, action.id);
      return newState;
    }
    case "book": {
      const newState = [...state];
      addBooking({ events: newState, id: action.id, info: action.info });
      return newState;
    }
    case "clear": {
      return [];
    }
  }
};

export const EventsContextProvider = (props) => {
  const [eventsState, dispatchEvents] = useReducer(eventsReducer, []);

  useEffect(() => {
    const handleInit = async () => {
      const storageState = await AsyncStorage.getItem("events");
      if (storageState) dispatchEvents({ type: "init", events: JSON.parse(storageState) });
    };
    handleInit();
  }, []);

  const addEvent = async (event) => {
    dispatchEvents({ type: "add", event });
    const eventsString = await AsyncStorage.getItem("events");
    if (eventsString) {
      const eventsArray = JSON.parse(eventsString);
      addSorted(event, eventsArray);
      await AsyncStorage.setItem("events", JSON.stringify(eventsArray));
    } else {
      await AsyncStorage.setItem("events", JSON.stringify([event]));
    }
  };

  const clearEvents = () => {
    Alert.alert("Are you sure?", "Are you sure you want clear all events?", [
      {
        text: "yes",
        onPress: async () => {
          dispatchEvents({ type: "clear" });
          await AsyncStorage.clear();
        },
      },
      {
        text: "cancel",
      },
    ]);
  };

  const toggleFav = async (id) => {
    dispatchEvents({ type: "toggleFav", id });
    const eventsString = await AsyncStorage.getItem("events");
    const events = JSON.parse(eventsString);
    setIsFav(events, id);
    await AsyncStorage.setItem("events", JSON.stringify(events));
  };

  const deleteEvent = (id) => {
    Alert.alert("Are you sure?", "Are you sure you want to delete this event?", [
      {
        text: "yes",
        onPress: async () => {
          dispatchEvents({ type: "delete", id });
          const eventsString = await AsyncStorage.getItem("events");
          const events = JSON.parse(eventsString);
          await AsyncStorage.setItem("events", JSON.stringify(events.filter((event) => event.id !== id)));
        },
      },
      {
        text: "cancel",
      },
    ]);
  };

  const createBooking = async ({ id, obj }) => {
    dispatchEvents({ type: "book", info: obj, id: id });
    const eventsString = await AsyncStorage.getItem("events");
    const events = JSON.parse(eventsString);
    addBooking({ events, id, info: obj });
    await AsyncStorage.setItem("events", JSON.stringify(events));
  };

  return (
    <EventsContext.Provider value={{ eventsState, addEvent, clearEvents, toggleFav, createBooking, deleteEvent }}>{props.children}</EventsContext.Provider>
  );
};

export default EventsContext;
