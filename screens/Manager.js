import { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput } from "react-native";
import EventsContext from "../store/events-context";
import Container from "../components/Container";
import EventCard from "../components/EventCard";
import ManagerButtons from "../components/ManagerButtons";
import Temp from "../components/Temp";

export default function Manager() {
  const ctx = useContext(EventsContext);
  const [events, setEvents] = useState(ctx.eventsState);
  useEffect(() => {
    setEvents(ctx.eventsState);
  }, [ctx.eventsState]);
  const handleSearch = (text) => {
    if (text.trim() !== "") {
      setEvents(
        ctx.eventsState?.filter((event) => {
          const addressString = `${event.location.city} ${event.location.street} ${event.location.number}`;
          return event.name.includes(text) || addressString.includes(text);
        })
      );
    } else setEvents(ctx.eventsState);
  };
  return (
    <Container>
      <TextInput style={styles.input} placeholder="Search" onChangeText={(newText) => handleSearch(newText)} />
      <FlatList
        data={events}
        renderItem={({ item }) => <EventCard item={item} Buttons={() => <ManagerButtons id={item.id} ctx={ctx} />} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
      />
      <Pressable style={styles.button} onPress={ctx.clearEvents}>
        <Text style={styles.buttonText}>Clear Events</Text>
      </Pressable>
      <Temp />
    </Container>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: 8,
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
  },
  circButton: {
    borderRadius: 100,
    backgroundColor: "#f3f3f6",
    padding: 12,
  },
  input: {
    borderWidth: 2,
    borderColor: "#e3e1e1",
    fontSize: 16,
    lineHeight: 16,
    paddingLeft: 14,
    height: 45,
    borderRadius: 8,
    marginBottom: 8,
  },
  button: {
    width: "100%",
    backgroundColor: "#4e37b2",
    color: "white",
    textAlign: "center",
    marginTop: 8,
    fontSize: 18,
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});
