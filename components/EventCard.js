import { Image, StyleSheet, Text, View } from "react-native";
import ToggleFavButton from "./ToggleFavButton";

export default function Test({ item, Buttons }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Image style={styles.image} source={{uri: item.image}} resizeMode="cover" />
        <View style={styles.cardTextsWrapper}>
          <View style={styles.cardTopRow}>
            <Text style={styles.date}>{`${item.date.day} ${item.date.month} ${item.date.year}`}</Text>
            <ToggleFavButton item={item}/>
          </View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.location}>{`${item.location.number} ${item.location.street}, ${item.location.city}`}</Text>
        </View>
      </View>
      <Buttons/>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    gap: 8,
  },
  cardTextsWrapper: {
    width: "100%",
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  date: {
    color: "#fb848b",
    fontSize: 12,
  },
  name: {
    fontSize: 20,
    lineHeight: 20,
  },
  location: {
    color: "#6b6b6b",
    fontSize: 12,
  },
});
