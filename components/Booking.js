import { useContext, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import EventsContext from "../store/events-context";

export default function Booking({ event, booking }) {
  const ctx = useContext(EventsContext);
  const dateRef = useRef(new Date(booking.date));
  return (
    <View style={styles.booking}>
      <View style={styles.bookingText}>
        <Text>Name: {booking.name}</Text>
        <Text>Document: {booking.document}</Text>
        <Text>
          Birthday: {dateRef.current.getDate()}/{dateRef.current.getMonth() + 1}/{dateRef.current.getFullYear()}
        </Text>
      </View>
      <Button
        style={styles.button}
        text="Delete"
        onPress={() => {
          ctx.deleteBooking({id: event.id, booking: booking});
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  booking: {
    borderWidth: 2,
    borderColor: "#e3e1e1",
    padding: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
  },
  bookingText: {
    width: "40%",
  },
  button: {
    flex: 0,
    paddingVertical: 8,
  },
});
