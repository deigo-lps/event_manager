import { StyleSheet, Text, View } from "react-native";

export default function IconText({ Icon, text }) {
  return (
    <View style={styles.row}>
      <Icon width={20} height={20} fill={"#fc8892"} />
      <Text style={styles.address}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
});
