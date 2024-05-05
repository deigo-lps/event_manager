import { useContext } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import EventsContext from "../store/events-context";
import image from "../images/image.png";
import Star from "../icons/Star";

export default function EventCard({ item }) {
  const ctx = useContext(EventsContext);
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Image style={styles.image} source={image} resizeMode="cover" />
        <View>
          <View style={styles.cardTopRow}>
            <Text style={styles.date}>{item.date}</Text>
            <Pressable
              onPress={() => {
                ctx.toggleFav(item.id);
              }}
            >
              <Star style={styles.star} width={20} height={20} fill={item.isFav ? "#f9b8b6" : "transparent"} stroke={"#f9b8b6"} />
            </Pressable>
          </View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.location}>{`${item.location.number} ${item.location.street}, ${item.location.city}`}</Text>
        </View>
      </View>
      <Pressable style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Ticket</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    borderColor: "white",
    borderWidth: 2,
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
    color: "white",
  },
  location: {
    color: "#c5c6cc",
    fontSize: 12,
  },
  bookButton: {
    backgroundColor: "#444e66",
    padding: 8,
    borderRadius: 8,
  },
  bookButtonText: {
    color: "white",
    fontSize: 14,
  },
});
