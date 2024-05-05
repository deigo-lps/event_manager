import { ImageBackground, Pressable, StyleSheet } from "react-native";
import image from "../images/image.png";
import Back from "../icons/Back";
import ToggleFavButton from "./ToggleFavButton";

export default function EventBackground({ event, navigation }) {
  return (
    <ImageBackground source={image} style={styles.image}>
      <Pressable onPress={()=>{navigation.goBack()}}>
        <Back width={25} height={25} fill={"#fc8892"} />
      </Pressable>
      <ToggleFavButton item={event} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 250,
    padding: 16,
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
