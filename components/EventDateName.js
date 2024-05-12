import { StyleSheet, Text, View } from "react-native";

export default function EventDateName({ event }) {
  return (
    <View style={styles.row}>
      <View style={styles.date}>
        <Text style={styles.day}>{event.date.day}</Text>
        <Text style={styles.month}>{event.date.month}</Text>
        <Text style={styles.year}>{event.date.year}</Text>
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
    paddingLeft: 12,
    paddingRight: 12,
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
    marginBottom: 4,
  },
  year: {
    fontSize: 12,
    lineHeight: 12,
    color: "white",
  },
  name: {
    fontSize: 25,
  },
});
