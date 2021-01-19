import React, { useState, useEffect } from "react";
import { firebase } from "../firebase.js";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import fetchFoods from "../utils/usda";

import { StackedBarChart, Grid } from "react-native-svg-charts";

const WeeklyMacroChart = () => {
  //console.log("you should see a chart");
  //console.log(foodResult.foods["0"]);
  //foodResult.foods[“0”].foodNutrients[“0”].value
  const data = [
    {
      //month: new Date(2015, 0, 1),
      protein: 1920,
      carbohydrates: 960,
      fat: 400,
    },
    {
      //month: new Date(2015, 1, 1),
      protein: 1600,
      carbohydrates: 1440,
      fat: 960,
    },
    {
      //month: new Date(2015, 2, 1),
      protein: 640,
      carbohydrates: 960,
      fat: 3640,
    },
    {
      //month: new Date(2015, 3, 1),
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

const SummaryScreen = () => {
  const [foodResults, setFoodResults] = useState([]);
  const [foodResult, setFoodResult] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [log, setLog] = useState(null);
  const [stopper, setStopper] = useState(null);

  useEffect(() => {
    console.log("Here is food results", foodResults);
  }, [foodResults]);
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
  useEffect(() => {
    if (admin && log) {
      fetchFoods(
        foodResults,
        setFoodResults,
        foodResult,
        setFoodResult,
        admin.apikey,
        log,
        stopper,
        setStopper
      );
    }
  }, [admin, log]);

  return (
    <View style={styles.container}>
      <WeeklyMacroChart />
      <Text>
        You ate:{" "}
        {
          foodResults.length == 0 ? "haha" : "a food"
          //: foodResults[1].foods["0"].description}
        }
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
