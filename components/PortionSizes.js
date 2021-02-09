import React from "react";
import { StyleSheet, View, Text } from "react-native";
import theme from "../utils/theme";
import { Picker } from "@react-native-picker/picker";

const PortionSizes = ({
  idResult,
  portionSize,
  setPortionSize,
  setGramsPerPortion,
}) => {
  const determinePortionOptions = () => {
    if (!idResult.foodPortions) {
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
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => {
          setGramsPerPortion(portions[itemIndex][itemValue]);
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

const styles = StyleSheet.create ({
  picker: {
    height: 30,
    width: 150,
    marginTop: 5,
  }
});
export default PortionSizes;
