import React from "react";
import { StyleSheet, View, Text } from "react-native";
import dailySumming from "../utils/dailySumming";
import theme from "../utils/theme";

const Badge = ({ nutrient, deficient }) => {
  return (
    <View style={deficient ? styles.BadgeBad : styles.BadgeGood}>{nutrient}</View>
  )
}

const initialChips = ["Vitamin A", "Vitamin C", "Calcium", "Iron"];

const VitaminsAndMinerals = ({ log, foodResults }) => {
  const data = dailySumming(log, foodResults);
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: '10px', marginTop: '10px' }}>Vitamins and Minerals</Text>
      {initialChips.map((nutrient) => {
        return <Badge deficient={nutrient == 'Calcium'}nutrient={nutrient}></Badge>
      })}
    </View>
  );
};

const BadgeBase = {
  minWidth: 40,
  height: 30,
  border: `solid 1px ${theme.darkGreen}`,
  paddingLeft: '10px',
  paddingRight: '10px',
  borderRadius: '50px',
  marginLeft: '5px',
  marginBottom: '5px',
  justifyContent: 'space-evenly',
  textAlign: 'center'
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.cream,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    maxWidth: 200,
    flexWrap: 'wrap'
  },
  BadgeGood: {
    ...BadgeBase,
    backgroundColor: theme.lightGreen
  },
  BadgeBad: {
    ...BadgeBase,
    backgroundColor: theme.red
  }
});

export default VitaminsAndMinerals;
