import React from "react";
import { StyleSheet, View, Text } from "react-native";
import theme from "../utils/theme";
import { weeklyDeficiencies, weeklySums } from "../utils/dailySumming";

const Badge = ({ nutrient, deficient }) => {
  return (
    <View style={deficient ? styles.BadgeBad : styles.BadgeGood}>
      <Text>{nutrient}</Text>
    </View>
  );
};

const initialChips = ["Vitamin A", "Vitamin C", "Calcium", "Iron"];

const VitaminsAndMinerals = ({ data }) => {
  const weeklyNutrients = weeklySums(data);
  const deficiencies = weeklyDeficiencies(weeklyNutrients);
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: "10px", marginTop: "10px" }}>
        Vitamins and Minerals
      </Text>
      {initialChips.map((nutrient) => {
        return (
          <Badge
            key={nutrient}
            deficient={deficiencies.includes(nutrient)}
            nutrient={nutrient}
          ></Badge>
        );
      })}
    </View>
  );
};

const BadgeBase = {
  minWidth: 40,
  height: 30,
  borderStyle: `solid 1px ${theme.darkGreen}`,
  paddingLeft: "10px",
  paddingRight: "10px",
  borderRadius: "50px",
  marginLeft: "5px",
  marginBottom: "5px",
  justifyContent: "space-evenly",
  textAlign: "center",
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.cream,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    maxWidth: 200,
    flexWrap: "wrap",
  },
  BadgeGood: {
    ...BadgeBase,
    backgroundColor: theme.lightGreen,
  },
  BadgeBad: {
    ...BadgeBase,
    backgroundColor: theme.red,
  },
});

export default VitaminsAndMinerals;
