import { Pressable } from "react-native";
import Star from "../icons/Star";
import { useContext } from "react";
import EventsContext from "../store/events-context";

export default function ToggleFavButton({item}) {
  const ctx = useContext(EventsContext)
  return (
    <Pressable
      onPress={() => {
        ctx.toggleFav(item.id);
      }}
    >
      <Star width={20} height={20} fill={item.isFav ? "#fc8892" : "transparent"} stroke={"#fc8892"} />
    </Pressable>
  );
}
