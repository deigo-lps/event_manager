import { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Trash from "../icons/Trash";
import Edit from "../icons/Edit";
import EventsContext from "../store/events-context";

export default function ManagerButtons({ id }) {
  const ctx = useContext(EventsContext);
  return (
    <View style={styles.buttons}>
      <Pressable style={styles.circButton} onPress={() => ctx.deleteEvent(id)}>
        <Trash fill="#fc8f94" width={20} height={20} />
      </Pressable>
      <Pressable style={styles.circButton}>
        <Edit fill="#fc8f94" width={20} height={20} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    gap: 12,
  },
  circButton: {
    borderRadius: 100,
    backgroundColor: "#f3f3f6",
    padding: 12,
  },
});
