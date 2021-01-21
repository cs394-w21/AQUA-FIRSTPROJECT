import React from "react";
import { View } from "react-native";
import { StackedBarChart, XAxis, YAxis } from "react-native-svg-charts";
import theme from "../utils/theme";

const WeeklyMacroChart = ({ data }) => {
  const colors = [theme.red, theme.orange, theme.darkYellow];
  const keys = ["protein", "carbohydrate", "fat"];
  const contentInset = { top: 30, bottom: 10 };
  return (
    <>
      <View>
        <View style={{ flexDirection: "row" }}>
          <YAxis
            data={data}
            min={0}
            max={Math.max(
              ...data.map((row) => row.protein + row.carbohydrate + row.fat)
            )}
            numberOfTicks={4}
            contentInset={contentInset}
            svg={{
              fill: "grey",
              fontSize: 10,
            }}
          ></YAxis>
          <StackedBarChart
            style={{ height: 200, flex: 1, width: 200 }}
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
            fill: "grey",
            fontSize: 10,
          }}
        />
      </View>
    </>
  );
};

export default WeeklyMacroChart;
