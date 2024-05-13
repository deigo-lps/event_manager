import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function DateInput({ dateIsSet, date, setDate, setDateIsSet, style, placeholder }) {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (e) => {
    setDate(new Date(e.nativeEvent.timestamp));
    setDateIsSet(true);
    setShowPicker(false);
  };

  return (
    <>
      {showPicker && <RNDateTimePicker value={date} onChange={handleDateChange} />}
      <Pressable
        style={[styles.date, style]}
        onPress={() => {
          setShowPicker(true);
        }}
      >
        <Text style={[styles.dateText, dateIsSet && { color: "black" }]}>
          {dateIsSet ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` : placeholder}
        </Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  date: {
    borderWidth: 2,
    borderColor: "#e3e1e1",
    paddingLeft: 14,
    height: 45,
    marginTop: 8,
    justifyContent: "center",
    borderRadius: 8,
  },
  dateText: {
    fontSize: 16,
    lineHeight: 16,
    color: "#6d6d6d",
  },
});
