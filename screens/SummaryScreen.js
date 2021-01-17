import React, { useState, useEffect } from "react";
import { firebase } from "../firebase.js";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import fetchFood from "../utils/usda";

const SummaryScreen = () => {
  const [foodResult, setFoodResult] = useState(null);

  const [log, setLog] = useState({ log: [] });
  useEffect(() => {
    const db = firebase.database().ref("users/1x2y3z/log");
    db.on(
      "value",
      (snap) => {
        if (snap.val()) setLog(snap.val());
      },
      (error) => console.log(error)
    );
    return () => {
      db.off("value", handleData);
    };
  }, []);
  fetchFood(foodResult, setFoodResult);
  return (
    <View style={styles.container}>
      <Text>You ate: {foodResult == null ? "" : foodResult.foods['0'].description}</Text>
      <StatusBar style="auto"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00ffff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SummaryScreen;
