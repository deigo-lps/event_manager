import { useContext } from "react";
import { FlatList, StyleSheet } from "react-native";
import EventsContext from "../store/events-context";
import Container from "../components/Container";
import sortFav from "../utils/sortFav";
import EventCard from "../components/EventCard";
import HomeButtons from "../components/HomeButtons";

export default function Home({ navigation }) {
  const ctx = useContext(EventsContext);
  return (
    <Container>
      <FlatList
        data={[...ctx.eventsState].sort((a, b) => sortFav(a, b))}
        renderItem={({ item }) => <EventCard item={item} Buttons={()=><HomeButtons id={item.id} navigation={navigation}/>} />}
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
