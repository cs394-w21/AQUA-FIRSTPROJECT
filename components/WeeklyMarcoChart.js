import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { StackedBarChart } from "react-native-svg-charts";
import dailySumming from "../utils/dailySumming";

const WeeklyMacroChart = ({ foodResults }) => {
  //console.log("you should see a chart");
  //console.log(foodResult.foods["0"]);
  //foodResult.foods[“0”].foodNutrients[“0”].value
  //console.log(foodResults[0].foods["0"].description, foodResults[0].foods["0"].foodNutrients["0"].value);
  dailySumming();
  const data = [
    {
      protein: foodResults[0].foods["0"].foodNutrients["0"].value,
      carbohydrates: foodResults[0].foods["0"].foodNutrients["2"].value,
      fat: foodResults[0].foods["0"].foodNutrients["1"].value,
    },
    {
      protein: 1,
      carbohydrates: 2,
      fat: 3,
    },
    {
      protein: 1,
      carbohydrates: 2,
      fat: 3,
    },
    {
      protein: 1,
      carbohydrates: 2,
      fat: 3,
    },
  ];
  const colors = ["#FFC09F", "#FFD799", "#FFEE93"];
  const keys = ["protein", "carbohydrates", "fat"];
  return (
    <View>
      <Text>Weekly Summary</Text>
      <StackedBarChart
        style={{ height: 200 }}
        animate={false}
        keys={keys}
        colors={colors}
        data={data}
        showGrid={false}
        contentInset={{ top: 30, bottom: 30 }}
      />
    </View>
  );
};

export default WeeklyMacroChart;
