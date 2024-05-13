import { Pressable, StyleSheet, Text } from "react-native";

const HomeButtons = ({ id, navigation }) => {
  const handleNavigation = () => {
    navigation.navigate("Book", { id });
  };
  return (
    <Pressable onPress={handleNavigation} style={styles.bookButton}>
      <Text style={styles.bookButtonText}>Book Ticket</Text>
    </Pressable>
  );
};

export default HomeButtons;

const styles = StyleSheet.create({
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
