import { StyleSheet, Text, View } from "react-native";

export default function EventDateName({ event }) {
  return (
    <View style={styles.row}>
      <View style={styles.date}>
        <Text style={styles.day}>{event.date.day}</Text>
        <Text style={styles.month}>{event.date.month}</Text>
      </View>
      <Text style={styles.name}>{event.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  date: {
    backgroundColor: "#fc8e94",
    alignItems: "center",
    borderRadius: 8,
    padding: 8,
  },
  day: {
    fontSize: 22,
    lineHeight: 22,
    color: "white",
    fontWeight: "bold",
  },
  month: {
    fontSize: 16,
    lineHeight: 16,
    color: "white",
  },
  name: {
    fontSize: 25,
  },
});
