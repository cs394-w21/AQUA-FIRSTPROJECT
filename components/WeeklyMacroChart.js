import React from "react";
import { View, Text } from "react-native";
import { StackedBarChart, XAxis } from "react-native-svg-charts";
import dailySumming from "../utils/dailySumming";
import theme from "../utils/theme";

const WeeklyMacroChart = ({ log, foodResults }) => {
  const data = dailySumming(log, foodResults);
  const colors = [theme.red, theme.orange, theme.darkYellow];
  const keys = ["protein", "carbohydrate", "fat"];
  const contentInset = { top: 30, bottom: 10 };
  return (
    <View>
      <Text>Weekly Summary</Text>
      <View>
        <StackedBarChart
          style={{ height: 200, flex: 1}}
          animate={false}
          keys={keys}
          colors={colors}
          data={data}
          showGrid={false}
          contentInset={contentInset}
        />
        <XAxis
          //style={{ flex: 1}}
          data={data}
          xAccessor={({ item }) => Math.floor(item.date)}
          contentInset={{ top: 5, bottom: 30, left: 7, right: 7 }}
          svg={{
              fill: 'grey',
              fontSize: 10,
          }}
        />
      </View>
    </View>
  );
};

export default WeeklyMacroChart;
