import { useContext, useState } from "react";
import {StyleSheet, View } from "react-native";
import EventsContext from "../store/events-context";
import { Alert } from "react-native";
import Button from "./Button";
import Input from "./Input";
import DateInput from "./DateInput";

export default function BookForm({ event, navigation }) {
  const ctx = useContext(EventsContext);
  const [date, setDate] = useState(new Date());
  const [dateIsSet, setDateIsSet] = useState(false);
  const [name, setName] = useState("");
  const [document, setDocument] = useState("");

  const handleSubmit = () => {
    const goBack = (text, text2) => {
      Alert.alert(text, text2, [
        {
          text: "Ok",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    };
    if (event.tickets >= 1 && name.trim() !== "" && document.trim() !== "" && dateIsSet) {
      ctx.createBooking({ id: event.id, obj: { name, document, date } });
      goBack("Booking Confirmed.", "Your booking has been confirmed.");
    } else if (event.tickets >= 1) {
      Alert.alert("Missing Field.", "Please fill in every field.", [{ text: "Ok" }]);
    } else {
      goBack("No more tickets.", "This event is full.");
    }
  };

  return (
    <>
      <Input placeholder="Full Name" value={name} onChangeText={(newText) => setName(newText)}/>
      <DateInput date={date} setDate={setDate} dateIsSet={dateIsSet} setDateIsSet={setDateIsSet} placeholder="Birth Date"/>
      <Input placeholder="Document" value={document} onChangeText={(newText) => setDocument(newText)}/>
      <View style={styles.buttons}>
        <Button onPress={handleSubmit} text="Book" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
    flex: 1,
    backgroundColor: "#4e37b2",
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  buttons: {
    marginTop: 16,
    flexDirection: "row",
    gap: 12,
  },
});
