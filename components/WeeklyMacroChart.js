import React from "react";
import { View } from "react-native";
import { StackedBarChart, XAxis, YAxis } from "react-native-svg-charts";
import theme from "../utils/theme";
import MacroChart from "./MacroChart";

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
          {/*
          <StackedBarChart
            style={{ height: 200, flex: 1, width: 200 }}
            animate={false}
            keys={keys}
            colors={colors}
            data={data}
            showGrid={true}
            contentInset={contentInset}
          />
          */}
          <MacroChart
            keys={["apples", "bananas", "dates"]}
            colors={colors}
            data={[
              {
                label: "Jan",
                apples: 300,
                bananas: 30,
                dates: 30,
              },
              {
                label: "Feb",
                apples: 30,
                bananas: 15,
                dates: 4,
              },
              {
                label: "Mar",
                apples: 30,
                bananas: 15,
                dates: 4,
              },
              {
                label: "Apr",
                apples: 30,
                bananas: 15,
                dates: 4,
              },
            ]}
          />
        </View>
        <XAxis
          style={{ flex: 1 }}
          data={data}
          xAccessor={({ item }) => Math.floor(item.date)}
          contentInset={contentInset}
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
