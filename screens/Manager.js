import { useContext } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import EventsContext from "../store/events-context";
import Container from "../components/Container";
import EventCard from "../components/EventCard";
import Trash from "../icons/Trash";
import Edit from "../icons/Edit";
import ManagerButtons from "../components/ManagerButtons";
import getUniqueId from "../utils/getUniqueId";

export default function Manager() {
  const ctx = useContext(EventsContext);
  const handlePress = () => {
    const date = new Date();
    ctx.addEvent({
      id: getUniqueId(),
      name: `Name${ctx.eventsState.length}`,
      date: {
        day: date.getDay(),
        month: date.toLocaleString("default", { month: "short" }),
        year: date.getFullYear(),
      },
      location: {
        city: "São Paulo",
        street: "Avenida Paulista",
        number: 731,
      },
      tickets: 1,
      price: 50,
    });
  };
  const handleClear = () => {
    ctx.clearEvents();
  };
  return (
    <Container>
      <FlatList
        data={ctx.eventsState}
        renderItem={({ item }) => <EventCard item={item} Buttons={() => <ManagerButtons id={item.id} ctx={ctx} />} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
      />
      <Pressable onPress={handlePress}>
        <Text>Add</Text>
      </Pressable>
      <Pressable onPress={handleClear}>
        <Text>Clear</Text>
      </Pressable>
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
});
