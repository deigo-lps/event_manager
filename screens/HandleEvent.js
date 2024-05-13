import { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import EventsContext from "../store/events-context";
import { Alert } from "react-native";
import Container from "../components/Container";
import getUniqueId from "../utils/getUniqueId";
import ImageIcon from "../icons/ImageIcon";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../components/Button";
import Input from "../components/Input";
import DateInput from "../components/DateInput";

export default function Create({ route, navigation }) {
  const event = route?.params?.event;
  const ctx = useContext(EventsContext);
  const [date, setDate] = useState((event?.fullDate && new Date(event.fullDate)) || new Date());
  const [dateIsSet, setDateIsSet] = useState(event);
  const [name, setName] = useState(event?.name || "");
  const [street, setStreet] = useState(event?.location.street || "");
  const [streetNumber, setStreetNumber] = useState(event?.location.number || "");
  const [city, setCity] = useState(event?.location.city || "");
  const [price, setPrice] = useState(event?.price || "");
  const [qtty, setQtty] = useState((event?.tickets && `${event?.tickets}`) || "");
  const [image, setImage] = useState(event?.image || null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (
      !dateIsSet ||
      name.trim() === "" ||
      street.trim() === "" ||
      streetNumber.trim() === "" ||
      city.trim() === "" ||
      price.trim() === "" ||
      qtty.trim() === "" ||
      image === null
    ) {
      Alert.alert("Missing Field.", "Please fill in every field.", [{ text: "Ok" }]);
      return;
    }
    if (!/\d/.test(streetNumber) || !/\d/.test(price) || !/\d/.test(qtty)) {
      Alert.alert("Invalid Field.", "Please fill in the fields correctly.", [{ text: "Ok" }]);
      return;
    }
    eventObj = {
      name: name,
      fullDate: date,
      date: {
        day: date.getDate(),
        month: date.toLocaleString("default", { month: "short" }),
        year: date.getFullYear(),
      },
      location: {
        city: city,
        street: street,
        number: streetNumber,
      },
      tickets: qtty,
      price: price,
      image: image,
    };
    if (event) {
      ctx.updateEvent({ id: event.id, bookings: event.bookings, isFav: event.isFav, ...eventObj });
      Alert.alert("Event Updated.", `${name} updated.`, [{ text: "Ok" }]);
      navigation.goBack();
    } else {
      ctx.addEvent({
        id: getUniqueId(),
        ...eventObj,
      });
      Alert.alert("Event Created.", `${name} created.`, [{ text: "Ok" }]);
      navigation.navigate("Main Navigation");
    }
    setDateIsSet(false);
    setName("");
    setStreet("");
    setStreetNumber("");
    setCity("");
    setPrice("");
    setQtty("");
    setImage(null);
  };

  return (
    <Container>
      <ScrollView style={{ flex: 1 }}>
        {image ? (
          <Pressable style={styles.setImage} onPress={pickImage}>
            <Image style={styles.image} source={{ uri: image }} resizeMode="cover" />
          </Pressable>
        ) : (
          <Pressable style={styles.setImage} onPress={pickImage}>
            <ImageIcon fill="white" width="25" height="25" />
          </Pressable>
        )}
        <Text>Name</Text>
        <Input
          placeholder="Name"
          value={name}
          style={{ marginBottom: 8, marginTop: 0 }}
          onChangeText={(newText) => {
            setName(newText);
          }}
        />
        <Text>Date</Text>
        <DateInput style={{ marginTop: 0, marginBottom: 8 }} date={date} setDate={setDate} dateIsSet={dateIsSet} setDateIsSet={setDateIsSet} />
        <Text>Street</Text>
        <Input
          placeholder="Street"
          value={street}
          style={{ marginBottom: 8, marginTop: 0 }}
          onChangeText={(newText) => {
            setStreet(newText);
          }}
        />
        <Text>Number</Text>
        <Input
          placeholder="Number"
          value={streetNumber}
          keyboardType="numeric"
          style={{ marginBottom: 8, marginTop: 0 }}
          onChangeText={(newText) => {
            setStreetNumber(newText);
          }}
        />
        <Text>City</Text>
        <Input
          placeholder="City"
          value={city}
          style={{ marginBottom: 8, marginTop: 0 }}
          onChangeText={(newText) => {
            setCity(newText);
          }}
        />
        <Text>Price</Text>
        <Input
          placeholder="Price"
          value={price}
          keyboardType="numeric"
          style={{ marginBottom: 8, marginTop: 0 }}
          onChangeText={(newText) => {
            setPrice(newText);
          }}
        />
        <Text>Tickets Qtty</Text>
        <Input
          placeholder="Tickets Qtty"
          value={qtty}
          keyboardType="numeric"
          style={{ marginBottom: 8, marginTop: 0 }}
          onChangeText={(newText) => {
            setQtty(newText);
          }}
        />
      </ScrollView>
      <View style={styles.buttons}>
        <Button onPress={handleSubmit} text="Save Event" />
        {event && (
          <Button
            onPress={() => {
              navigation.goBack();
            }}
            text="Cancel"
          />
        )}
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    gap: 12,
  },
  setImage: {
    borderRadius: 100,
    backgroundColor: "#4e38b2",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  image: {
    borderRadius: 100,
    width: 60,
    height: 60,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
