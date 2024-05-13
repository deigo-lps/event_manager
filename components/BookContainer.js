import Container from "../components/Container";
import { StyleSheet, View } from "react-native";
import EventBackground from "../components/EventBackground";
import EventDateName from "./EventDateName";
import IconText from "./IconText";
import Ticket from "../icons/Ticket";
import Money from "../icons/Money";
import Location from "../icons/Location";

export default function BookContainer({ children, event, navigation }) {
  return (
    <Container style={styles.container}>
      <EventBackground event={event} navigation={navigation} />
      <View style={styles.wrapper}>
        <EventDateName event={event} />
        <IconText Icon={Location} text={`${event.location.number} ${event.location.street}, ${event.location.city}`} />
        <IconText Icon={Ticket} text={event.tickets} />
        <IconText Icon={Money} text={event.price} />
        {children}
      </View>
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
    backgroundColor: "white",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -40,
    padding: 20,
  },
});
