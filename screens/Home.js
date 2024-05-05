import { useContext } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import EventsContext from "../store/events-context";
import getUniqueId from "../utils/getUniqueId";
import EventCard from "../components/EventCard";

export default function Home() {
  const ctx = useContext(EventsContext);
  const handlePress = () => {
    ctx.addEvent({
      id: getUniqueId(),
      name: "Name",
      date: "25 oct. 2020",
      location: {
        city: "São Paulo",
        street: "Avenida Paulista",
        number: 731,
      },
      tickets: 200,
    });
  };
  const handleClear = () => {
    ctx.clearEvents();
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={ctx.eventsState}
        renderItem={({ item }) => <EventCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
      />
      <Pressable onPress={handlePress}>
        <Text>Add</Text>
      </Pressable>
      <Pressable onPress={handleClear}>
        <Text>Clear</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#242936",
    flex: 1,
  },
  contentContainer: {
    gap: 8,
  },
});
