import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ReactChipsInput from "react-native-chips";
import dailySumming from "../utils/dailySumming";
import theme from "../utils/theme";

const VitaminsAndMinerals = ({ log, foodResults }) => {
  const data = dailySumming(log, foodResults);
  return (
    <View style={styles.container}>
      <ReactChipsInput
        label="Vitamins and Minerals"
        initialChips={["Vitamin A", "Vitamin C", "Calcium", "Iron"]}
        onChangeChips={(chips) => console.log(chips)}
        alertRequired={true}
        chipStyle={{
          borderColor: theme.darkGreen,
          backgroundColor: theme.lightGreen,
        }}
        //inputStyle={{ fontSize: 22 }}
        labelStyle={{ color: theme.darkGreen }}
        labelOnBlur={{ color: theme.gray }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.cream,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default VitaminsAndMinerals;
