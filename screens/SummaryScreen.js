import React, { useState, useEffect } from "react";
import { firebase } from "../firebase.js";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
//import RequestFoodData from "../utils/nutritionix";
import getFood from "../utils/usda"

async function fetchFood() {
  const result = await getFood();
  console.log(result);
}

const SummaryScreen = () => {
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
  console.log(JSON.stringify(log));
  return (
    <View style={styles.container}>
      <Text>You ate: {JSON.stringify(fetchFood())}</Text>
      <StatusBar style="auto" />
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
