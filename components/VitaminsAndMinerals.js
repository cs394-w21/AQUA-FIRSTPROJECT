import React from "react";
import { StyleSheet, View, Text } from "react-native";
import dailySumming from "../utils/dailySumming";
import theme from "../utils/theme";

const Badge = ({ nutrient }) => {
  return (
    <View style={{minWidth: 40, height: 30, border: `solid 1px ${theme.darkGreen}`, paddingLeft: '10px', paddingRight: '10px',
    borderRadius: '50px', backgroundColor: theme.lightGreen, marginLeft: '5px', marginBottom: '5px',
     justifyContent: 'space-evenly', textAlign: 'center' 
  }}>{nutrient}</View>
  )
}

const initialChips = ["Vitamin A", "Vitamin C", "Calcium", "Iron"];

const VitaminsAndMinerals = ({ log, foodResults }) => {
  const data = dailySumming(log, foodResults);
  return (
    <View style={styles.container}>
      <Text style={{marginBottom: '10px', marginTop: '10px'}}>Vitamins and Minerals</Text>
      {initialChips.map((nutrient)=> {
        return <Badge nutrient={nutrient}></Badge>
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.cream,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    maxWidth: 200,
    flexWrap: 'wrap'
  },
});

export default VitaminsAndMinerals;
