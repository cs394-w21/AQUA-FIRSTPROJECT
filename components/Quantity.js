import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import theme from "../utils/theme";

const Quantity = ({ setQuantity }) => {
  const [input, setInput] = useState(1);
  return (
    <View>
      <Text>Qty:</Text>
      <TextInput
        style={styles.quantityInput}
        onChangeText={(text) => {
          setInput(text);
          Number(text)
            ? setQuantity(Number(text))
            : alert("Please enter a number for the quantity.");
        }}
        value={input}
        keyboardType={"number-pad"}
      ></TextInput>
    </View>
  );
};
const styles = StyleSheet.create({
  quantityInput: {
    width: 70,
    height: 30,
    borderStyle: "solid",
    borderWidth: 30,
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: 1,
    textAlign: "center",
    backgroundColor: "white",
    marginTop: 5,
  },
});

export default Quantity;
