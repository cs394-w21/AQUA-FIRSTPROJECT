import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { StackedBarChart } from "react-native-svg-charts";


const WeeklyMacroChart = ({ foodResults }) => {
  //console.log("you should see a chart");
  //console.log(foodResult.foods["0"]);
  //foodResult.foods[“0”].foodNutrients[“0”].value
  console.log(foodResults[0].foods["0"].description, foodResults[0].foods["0"].foodNutrients["0"].value);
  const data = [
    {
      protein: float(foodResults[0].foods["0"].foodNutrients["0"].value),
      carbohydrates: foodResults[0].foods["0"].foodNutrients["2"].value,
      fat: foodResults[0].foods["0"].foodNutrients["1"].value,
    },
    {
      protein: 1600,
      carbohydrates: 1440,
      fat: 960,
    },
    {
      protein: 640,
      carbohydrates: 960,
      fat: 3640,
    },
    {
      protein: 3320,
      carbohydrates: 480,
      fat: 640,
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
