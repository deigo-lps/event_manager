import { StyleSheet, View } from "react-native";

export default function Container({ children, style }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    // paddingBottom: 200,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "white",
    flex: 1,
  },
});
