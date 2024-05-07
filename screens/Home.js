import { useContext } from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import EventsContext from "../store/events-context";
import getUniqueId from "../utils/getUniqueId";
import EventCard from "../components/EventCard";
import Container from "../components/Container";
import sortFav from "../utils/sortFav";

export default function Home({ navigation }) {
  const ctx = useContext(EventsContext);
  const handlePress = () => {
    const date = new Date();
    ctx.addEvent({
      id: getUniqueId(),
      name: `Name${ctx.eventsState.length}`,
      date: {
        day: date.getDay(),
        month: date.toLocaleString('default', { month: 'short' }),
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
        data={ctx.eventsState.sort((a, b) => sortFav(a, b))}
        renderItem={({ item }) => <EventCard item={item} navigation={navigation}/>}
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
});
