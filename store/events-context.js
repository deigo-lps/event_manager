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
  updateEvent: (event) => {},
  deleteBooking: (event, booking) => {},
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
    case "update": {
      const newState = state.filter((event) => event.id !== action.event.id);
      addSorted(action.event, newState);
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
    case "deleteBook": {
      const newState = [...state];
      const event = newState.find((event) => event.id === action.id);
      event.bookings = event.bookings.filter((booking) => booking.document !== action.booking.document);
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
    try {
      const eventsString = await AsyncStorage.getItem("events");
      if (eventsString) {
        const eventsArray = JSON.parse(eventsString);
        addSorted(event, eventsArray);
        await AsyncStorage.setItem("events", JSON.stringify(eventsArray));
      } else {
        await AsyncStorage.setItem("events", JSON.stringify([event]));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateEvent = async (event) => {
    dispatchEvents({ type: "update", event });
    try {
      const eventsString = await AsyncStorage.getItem("events");
      const eventsArray = JSON.parse(eventsString).filter((old) => old.id !== event.id);
      addSorted(event, eventsArray);
      await AsyncStorage.setItem("events", JSON.stringify(eventsArray));
    } catch (e) {
      console.error(e);
    }
  };

  const clearEvents = () => {
    Alert.alert("Are you sure?", "Are you sure you want clear all events?", [
      {
        text: "yes",
        onPress: async () => {
          dispatchEvents({ type: "clear" });
          try {
            await AsyncStorage.clear();
          } catch (e) {
            console.error(e);
          }
        },
      },
      {
        text: "cancel",
      },
    ]);
  };

  const toggleFav = async (id) => {
    dispatchEvents({ type: "toggleFav", id });
    try {
      const eventsString = await AsyncStorage.getItem("events");
      const events = JSON.parse(eventsString);
      setIsFav(events, id);
      await AsyncStorage.setItem("events", JSON.stringify(events));
    } catch (e) {
      console.error(e);
    }
  };

  const deleteEvent = (id) => {
    Alert.alert("Are you sure?", "Are you sure you want to delete this event?", [
      {
        text: "yes",
        onPress: async () => {
          dispatchEvents({ type: "delete", id });
          try {
            const eventsString = await AsyncStorage.getItem("events");
            const events = JSON.parse(eventsString);
            await AsyncStorage.setItem("events", JSON.stringify(events.filter((event) => event.id !== id)));
          } catch (e) {
            console.error(e);
          }
        },
      },
      {
        text: "cancel",
      },
    ]);
  };

  const createBooking = async ({ id, obj }) => {
    dispatchEvents({ type: "book", info: obj, id: id });
    try {
      const eventsString = await AsyncStorage.getItem("events");
      const events = JSON.parse(eventsString);
      addBooking({ events, id, info: obj });
      await AsyncStorage.setItem("events", JSON.stringify(events));
    } catch (e) {
      console.error(e);
    }
  };

  const deleteBooking = ({ id, booking }) => {
    Alert.alert("Are you sure?", "Are you sure you delete this booking?", [
      {
        text: "yes",
        onPress: async () => {
          dispatchEvents({ type: "deleteBook", id: id, booking: booking });
          try {
            const eventsString = await AsyncStorage.getItem("events");
            const events = JSON.parse(eventsString);
            const event = events.find((findEv) => findEv.id === id);
            event.bookings = event.bookings.filter((filtBook) => filtBook.document !== booking.document);
            await AsyncStorage.setItem("events", JSON.stringify(events));
          } catch (e) {
            console.error(e);
          }
        },
      },
      {
        text: "cancel",
      },
    ]);
  };

  return (
    <EventsContext.Provider value={{ eventsState, addEvent, clearEvents, toggleFav, createBooking, deleteEvent, updateEvent, deleteBooking }}>
      {props.children}
    </EventsContext.Provider>
  );
};

export default EventsContext;
