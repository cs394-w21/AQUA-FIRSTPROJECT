import React from "react";
import { StyleSheet, View, Text } from "react-native";
import theme from "../utils/theme";
import { Picker } from "@react-native-picker/picker";

const PortionSizes = ({
  idResult,
  portionSize,
  setPortionSize,
  setGramValue,
}) => {
  const determinePortionOptions = () => {
    if (idResult.foodPortions.length == 0) {
      return [{ "100 g": 100 }];
    }
    const portions = Object.values(idResult.foodPortions).map((p) => {
      if (!("portionDescription" in p)) {
        let s = "" + p.amount + " " + p.modifier + "";
        return { [s]: p.gramWeight };
      } else if (p.portionDescription == "Quantity not specified") {
        let s = "" + p.gramWeight + " g";
        return { [s]: p.gramWeight };
      } else {
        let s = p.portionDescription;
        return { [s]: p.gramWeight };
      }
    });
    if (!portions.includes({ "100 g": 100 })) {
      portions.unshift({ "100 g": 100 });
    }
    return portions;
  };
  const portions = determinePortionOptions();
  return (
    <View>
      <Text>Portion Size:</Text>
      <Picker
        selectedValue={portionSize}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => {
          setGramValue(portions[itemIndex][itemValue]);
          setPortionSize(itemValue);
        }}
      >
        {portions.map((value, idx) => {
          return (
            <Picker.Item
              label={Object.keys(value)[0]}
              value={Object.keys(value)[0]}
              key={idx}
            />
          );
        })}
      </Picker>
    </View>
  );
};
export default PortionSizes;
