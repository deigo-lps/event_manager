import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput } from "react-native";
import EventsContext from "../store/events-context";
import { Alert } from "react-native";
import Container from "../components/Container";
import getUniqueId from "../utils/getUniqueId";
import ImageIcon from "../icons/ImageIcon";
import * as ImagePicker from "expo-image-picker";

export default function Create() {
  const ctx = useContext(EventsContext);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dateIsSet, setDateIsSet] = useState(false);
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [qtty, setQtty] = useState("");
  const [image, setImage] = useState(null);

  const handleDateChange = (e) => {
    setDate(new Date(e.nativeEvent.timestamp));
    setDateIsSet(true);
    setShowPicker(false);
  };

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
      image !== null
    ) {
      Alert.alert("Missing Field.", "Please fill in every field.", [{ text: "Ok" }]);
      return;
    }
    if (!/\d/.test(streetNumber) || !/\d/.test(price) || !/\d/.test(qtty)) {
      Alert.alert("Invalid Field.", "Please fill in the fields correctly.", [{ text: "Ok" }]);
      return;
    }
    ctx.addEvent({
      id: getUniqueId(),
      name: name,
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
      image: image
    });
    Alert.alert("Event Created.", `${name} created.`, [{ text: "Ok" }]);
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
      {showPicker && <RNDateTimePicker display="spinner" value={date} onChange={handleDateChange} />}
      {image ? (
        <Pressable style={styles.setImage} onPress={pickImage}>
          <Image style={styles.image} source={{ uri: image }} resizeMode="cover" />
        </Pressable>
      ) : (
        <Pressable style={styles.setImage} onPress={pickImage}>
          <ImageIcon fill="white" width="25" height="25" />
        </Pressable>
      )}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(newText) => {
          setName(newText);
        }}
      />
      <Pressable
        style={styles.birth}
        onPress={() => {
          setShowPicker(true);
        }}
      >
        <Text style={[styles.birthText, dateIsSet && { color: "black" }]}>
          {dateIsSet ? `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}` : "Date"}
        </Text>
      </Pressable>
      <TextInput
        style={styles.input}
        placeholder="Street"
        value={street}
        onChangeText={(newText) => {
          setStreet(newText);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Street Number"
        value={streetNumber}
        keyboardType="numeric"
        onChangeText={(newText) => {
          setStreetNumber(newText);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={(newText) => {
          setCity(newText);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        keyboardType="numeric"
        onChangeText={(newText) => {
          setPrice(newText);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Tickets Qtty"
        value={qtty}
        keyboardType="numeric"
        onChangeText={(newText) => {
          setQtty(newText);
        }}
      />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Event</Text>
      </Pressable>
    </Container>
  );
}
const styles = StyleSheet.create({
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
  input: {
    borderWidth: 2,
    borderColor: "#e3e1e1",
    fontSize: 16,
    lineHeight: 16,
    paddingLeft: 14,
    height: 45,
    marginTop: 8,
    borderRadius: 8,
  },
  birth: {
    borderWidth: 2,
    borderColor: "#e3e1e1",
    paddingLeft: 14,
    height: 45,
    marginTop: 8,
    justifyContent: "center",
    borderRadius: 8,
  },
  birthText: {
    fontSize: 16,
    lineHeight: 16,
    color: "#6d6d6d",
  },
  button: {
    width: "100%",
    backgroundColor: "#4e37b2",
    color: "white",
    textAlign: "center",
    marginTop: 16,
    fontSize: 18,
    padding: 14,
    borderRadius: 8,
    marginTop: "auto",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});
