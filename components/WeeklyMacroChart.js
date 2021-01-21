import React from "react";
import { View, Text } from "react-native";
import { StackedBarChart, XAxis, YAxis } from "react-native-svg-charts";
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
        <View style={{flexDirection: 'row'}}>
          <YAxis
          data={data}
          min={0}
          max={60}
          numberOfTicks={4}
          contentInset={contentInset}
          svg={{
            fill: 'grey',
            fontSize: 10
          }}
          >
          </YAxis>
          <StackedBarChart

            style={{ height: 200, flex: 1, width: 200}}
            animate={false}
            keys={keys}
            colors={colors}
            data={data}
            showGrid={true}
            contentInset={contentInset}
          />
        </View>
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
