import React, { useState, useEffect } from "react";
import { firebase } from "../firebase.js";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import fetchFood from "../utils/usda";

import { StackedBarChart, Grid } from "react-native-svg-charts";

const WeeklyMacroChart = () => {
  console.log("you should see a chart");
  const data = [
    {
      month: new Date(2015, 0, 1),
      apples: 3840,
      bananas: 1920,
      cherries: 960,
      dates: 400,
      oranges: 400,
    },
    {
      month: new Date(2015, 1, 1),
      apples: 1600,
      bananas: 1440,
      cherries: 960,
      dates: 400,
    },
    {
      month: new Date(2015, 2, 1),
      apples: 640,
      bananas: 960,
      cherries: 3640,
      dates: 400,
    },
    {
      month: new Date(2015, 3, 1),
      apples: 3320,
      bananas: 480,
      cherries: 640,
      dates: 400,
    },
  ];

  const colors = ["#7b4173", "#a55194", "#ce6dbd", "#de9ed6"];
  const keys = ["apples", "bananas", "cherries", "dates"];

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

const SummaryScreen = () => {
  const [foodResult, setFoodResult] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [log, setLog] = useState(null);

  useEffect(() => {
    const db = firebase.database().ref("users/1x2y3z/log");
    const handleData = (snap) => {
      if (snap.val()) setLog(snap.val());
    };
    db.on("value", handleData, (error) => console.log(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);
  useEffect(() => {
    const db = firebase.database().ref("admin");
    const handleData = (snap) => {
      if (snap.val()) {
        setAdmin(snap.val());
      }
    };
    db.on("value", handleData, (error) => console.log(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);
  if (admin && log) {
    fetchFood(foodResult, setFoodResult, admin.apikey, log.food);
  }

  return (
    <View style={styles.container}>
      <WeeklyMacroChart />
      <Text>
        You ate: {foodResult == null ? "" : foodResult.foods["0"].description}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SummaryScreen;
