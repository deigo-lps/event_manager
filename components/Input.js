import {  StyleSheet, TextInput } from "react-native";

export default function Input({style, placeholder, onChangeText, value}) {
  return <TextInput style={[styles.input, style]} placeholder={placeholder} value={value || ""} onChangeText={onChangeText} />;
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
});