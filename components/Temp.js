import { useContext } from "react";
import { Pressable, Text } from "react-native";
import EventsContext from "../store/events-context";
import getUniqueId from "../utils/getUniqueId";

export default function Temp() {
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
  return (
    <>
      <Pressable onPress={handlePress}>
        <Text>Add</Text>
      </Pressable>
    </>
  );
}
