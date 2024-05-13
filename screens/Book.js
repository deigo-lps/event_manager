import { useContext, useRef } from "react";
import EventsContext from "../store/events-context";
import BookForm from "../components/BookForm";
import BookContainer from "../components/BookContainer";

export default function Reserve({ route, navigation }) {
  const ctx = useContext(EventsContext);
  const { id } = route.params;
  const eventRef = useRef(ctx.eventsState.find((event) => event.id === id));
  return (
    <BookContainer event={eventRef.current} navigation={navigation}>
      <BookForm event={eventRef.current} navigation={navigation} />
    </BookContainer>
  );
}
