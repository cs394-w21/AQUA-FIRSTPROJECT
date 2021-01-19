import React, { useState, useEffect } from "react";

import { firebase } from "../firebase.js";
import { StyleSheet, View, Text } from "react-native";
import { fetchFoods } from "../utils/usda";
import WeeklyMacroChart from "../components/WeeklyMarcoChart";

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
      <WeeklyMacroChart foodResults={ foods } />
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
