import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput } from "react-native";
import EventsContext from "../store/events-context";
import { Alert } from "react-native";

export default function BookForm({ event, navigation }) {
  const ctx = useContext(EventsContext);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dateIsSet, setDateIsSet] = useState(false);
  const [name, setName] = useState("");
  const [document, setDocument] = useState("");

  const handleDateChange = (e) => {
    setDate(new Date(e.nativeEvent.timestamp));
    setDateIsSet(true);
    setShowPicker(false);
  };

  const handleSubmit = () => {
    if (event.tickets >= 1 && name.trim() !== "" && document.trim() !== "" && dateIsSet) {
      ctx.createBooking({ id: event.id, obj: { name, document, date } });
      Alert.alert("Booking Confirmed.", "Your booking has been confirmed.", [
        {
          text: "Ok",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } else if (event.tickets >= 1) {
      Alert.alert("Missing Field.", "Please fill in every field.", [{ text: "Ok" }]);
    } else {
      Alert.alert("No more tickets.", "This event is full.", [
        {
          text: "Ok",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };

  return (
    <>
      {showPicker && <RNDateTimePicker value={date} onChange={handleDateChange} />}
      <TextInput style={styles.input} placeholder="Full Name" onChangeText={(newText) => setName(newText)} />
      <Pressable
        style={styles.birth}
        onPress={() => {
          setShowPicker(true);
        }}
      >
        <Text style={[styles.birthText, dateIsSet && { color: "black" }]}>
          {dateIsSet ? `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}` : "Birth Date"}
        </Text>
      </Pressable>
      <TextInput style={styles.input} placeholder="Document" onChangeText={(newText) => setDocument(newText)} />
      <Pressable onPress={handleSubmit}>
        <Text style={styles.button}>Book</Text>
      </Pressable>
    </>
  );
}
const styles = StyleSheet.create({
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
  },
});
