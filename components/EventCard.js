import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import image from "../images/image.png";
import ToggleFavButton from "./ToggleFavButton";
import Star from "../icons/Star";

export default function EventCard({ item, navigation }) {
  const handleNavigation = () => {
    navigation.navigate("Book", { id: item.id });
  };
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Image style={styles.image} source={image} resizeMode="cover" />
        <View>
          <View style={styles.cardTopRow}>
            <Text style={styles.date}>{`${item.date.day} ${item.date.month} ${item.date.year}`}</Text>
            <ToggleFavButton item={item}/>
          </View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.location}>{`${item.location.number} ${item.location.street}, ${item.location.city}`}</Text>
        </View>
      </View>
      <Pressable onPress={handleNavigation} style={styles.bookButton}>
        <Text style={styles.bookButtonText}>
          Book Ticket
        </Text>
      </Pressable>
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
    gap: 8,
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
