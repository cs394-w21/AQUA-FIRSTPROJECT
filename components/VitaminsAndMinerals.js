import React from "react";
import { StyleSheet, View, Text } from "react-native";
import dailySumming from "../utils/dailySumming";
import theme from "../utils/theme";

const Badge = ({ nutrient, deficient }) => {
  return (
    <View style={deficient ? styles.BadgeBad : styles.BadgeGood}>
      <Text>{nutrient}</Text>
    </View>
  );
};

const initialChips = ["Vitamin A", "Vitamin C", "Calcium", "Iron"];

const VitaminsAndMinerals = ({ log, foodResults }) => {
  const data = dailySumming(log, foodResults);
  const weeklyNutrients = data.reduce(
    (total, logItem) => {
      return {
        Protein: total.Protein + logItem.protein,
        Carbohydrate: total.Carbohydrate + logItem.carb,
        Fat: total.Fat + logItem.fat,
        Calcium: total.Calcium + logItem.calcium,
        Iron: total.Iron + logItem.iron,
        "Vitamin A": total["Vitamin A"] + logItem.vit_a,
        "Vitamin C": total["Vitamin C"] + logItem.vit_c,
      };
    },
    {
      Protein: 0,
      Carbohydrate: 0,
      Fat: 0,
      Calcium: 0,
      Iron: 0,
      "Vitamin A": 0,
      "Vitamin C": 0,
    }
  );
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: "10px", marginTop: "10px" }}>
        Vitamins and Minerals
      </Text>
      {initialChips.map((nutrient) => {
        console.log("actual", nutrient, weeklyNutrients[nutrient]);
        console.log("recc", nutrient, weeklyDV[nutrient]);
        return (
          <Badge
            key={nutrient}
            deficient={weeklyNutrients[nutrient] <= weeklyDV[nutrient]}
            nutrient={nutrient}
          ></Badge>
        );
      })}
    </View>
  );
};

const weeklyDV = {
  Calcium: 9100,
  Iron: 126,
  "Vitamin A": 6300,
  "Vitamin C": 630,
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
