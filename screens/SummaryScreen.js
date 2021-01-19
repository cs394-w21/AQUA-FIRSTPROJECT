import React, { useState, useEffect } from "react";

import { firebase } from "../firebase.js";
import { StyleSheet, View, Text } from "react-native";
import { fetchFoods } from "../utils/usda";
import { StackedBarChart } from "react-native-svg-charts";

const WeeklyMacroChart = () => {
  //console.log("you should see a chart");
  //console.log(foodResult.foods["0"]);
  //foodResult.foods[“0”].foodNutrients[“0”].value
  const data = [
    {
      protein: 1920,
      carbohydrates: 960,
      fat: 400,
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
const SummaryScreen = () => {
  const [admin, setAdmin] = useState(null);
  const [log, setLog] = useState(null);
  const [foods, setFoods] = useState(null);

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
    console.log("Foods:", foods);
  }, [foods]);

  useEffect(() => {
    if (admin && log) {
      const built = Object.keys(log["foods"]).map((food) => log.foods[food]);
      fetchFoods(admin.apikey, built).then((value) => {
        if (!foods) {
          setFoods(value);
        }
      });
    }
  }, [admin, log]);

  return (
    <View style={styles.container}>
      <WeeklyMacroChart />
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
