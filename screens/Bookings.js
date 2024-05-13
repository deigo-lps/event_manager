import { FlatList, StyleSheet } from "react-native";
import BookContainer from "../components/BookContainer";
import Booking from "../components/Booking";
import { useContext, useEffect } from "react";
import EventsContext from "../store/events-context";


export default function Bookings({ route, navigation }) {
  const ctx = useContext(EventsContext)
  const event = ctx.eventsState.find(event=>event.id === route?.params?.id)
  return (
    <BookContainer event={event} navigation={navigation}>
      <FlatList
        data={event.bookings}
        renderItem={({ item }) => <Booking event={event} booking={item}/>}
        keyExtractor={(item) => item.document}
        contentContainerStyle={styles.contentContainer}
      />
    </BookContainer>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: 8,
  },
});


