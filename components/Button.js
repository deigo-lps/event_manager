import { Pressable, StyleSheet, Text } from "react-native";

export default function Button({ style, onPress, text }) {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: "#4e37b2",
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});
