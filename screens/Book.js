import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Container from "../components/Container";
import { useContext, useRef } from "react";
import EventsContext from "../store/events-context";
import Location from "../icons/Location";
import Ticket from "../icons/Ticket";
import IconText from "../components/IconText";
import Money from "../icons/Money";
import EventBackground from "../components/EventBackground";
import EventDateName from "../components/EventDateName";
import BookForm from "../components/BookForm";

export default function Reserve({ route, navigation }) {
  const ctx = useContext(EventsContext);
  const { id } = route.params;
  const eventRef = useRef(ctx.eventsState.find((event) => event.id === id));
  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <EventBackground event={eventRef.current} navigation={navigation} />
        <View style={styles.wrapper}>
          <EventDateName event={eventRef.current} />
          <IconText Icon={Location} text={`${eventRef.current.location.number} ${eventRef.current.location.street}, ${eventRef.current.location.city}`} />
          <IconText Icon={Ticket} text={eventRef.current.tickets} />
          <IconText Icon={Money} text={eventRef.current.price} />
          <BookForm event={eventRef.current} navigation={navigation}/>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  scrollContentContainer: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -40,
    padding: 20,
  },
});
