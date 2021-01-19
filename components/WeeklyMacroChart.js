import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { StackedBarChart } from "react-native-svg-charts";
import dailySumming from "../utils/dailySumming";

const WeeklyMacroChart = ({ log, foodResults }) => {
  const data = dailySumming(log, foodResults);
  const colors = ["#FFC09F", "#FFD799", "#FFEE93"];
  const keys = ["protein", "carbohydrate", "fat"];
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
