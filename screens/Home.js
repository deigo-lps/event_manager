import { useContext } from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import EventsContext from "../store/events-context";
import Container from "../components/Container";
import sortFav from "../utils/sortFav";
import EventCard from "../components/EventCard";

const Buttons = ({ id, navigation }) => {
  const handleNavigation = () => {
    navigation.navigate("Book", { id });
  };
  return (
    <Pressable onPress={handleNavigation} style={styles.bookButton}>
      <Text style={styles.bookButtonText}>Book Ticket</Text>
    </Pressable>
  );
};

export default function Home({ navigation }) {
  const ctx = useContext(EventsContext);
  return (
    <Container>
      <FlatList
        data={[...ctx.eventsState].sort((a, b) => sortFav(a, b))}
        renderItem={({ item }) => <EventCard item={item} Buttons={()=><Buttons id={item.id} navigation={navigation}/>} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: 8,
  },
  bookButton: {
    backgroundColor: "#4e37b2",
    padding: 8,
    borderRadius: 8,
    color: "white",
    fontSize: 14,
  },
  bookButtonText: {
    color: "white",
    fontSize: 14,
  },
});
