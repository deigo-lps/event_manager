import { Pressable, StyleSheet, Text, View } from "react-native";

const HomeButtons = ({ id, navigation }) => {
  return (
    <View style={styles.buttons}>
      <Pressable onPress={()=>{navigation.navigate("Book", { id })}} style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Ticket</Text>
      </Pressable>
      <Pressable onPress={()=>{navigation.navigate("Bookings", { id })}} style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Status</Text>
      </Pressable>
    </View>
  );
};

export default HomeButtons;

const styles = StyleSheet.create({
  buttons: {
    gap: 4,
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
    textAlign: "center"
  },
});
