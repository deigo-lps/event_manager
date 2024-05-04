import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import EventsContext from "../store/events-context";
import getUniqueId from "../utils/getUniqueId";

export default function Home() {
  const ctx = useContext(EventsContext);
  const handlePress = () => {
    ctx.dispatchEvents({ type: "clear" });
    ctx.dispatchEvents({
      type: "add",
      event: { name: "asd", id: getUniqueId() },
    });
    getUniqueId();
  };
  return (
    <View style={styles.container}>
      {ctx.eventsState.map((event) => (
        <View key={event.id}>
          <Text>{event.name}</Text>
          <Text>{event.id}</Text>
        </View>
      ))}
      <Pressable onPress={handlePress}>
        <Text>Open up App.js to start working on your app!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
