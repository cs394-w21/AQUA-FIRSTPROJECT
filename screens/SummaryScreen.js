import React, { useState, useEffect } from "react";
import { firebase } from "../firebase.js";
import { StyleSheet, View, Text } from "react-native";
import { getFood, fetchFoods } from "../utils/usda";
import WeeklyMacroChart from "../components/WeeklyMacroChart";
import VitaminsAndMinerals from "../components/VitaminsAndMinerals";
import theme from "../utils/theme";
import Recommendations from "../components/Recommendations.js";
import dailySumming from "../utils/dailySumming";
import { ScrollView } from "react-native-gesture-handler";

const SummaryScreen = () => {
  const [admin, setAdmin] = useState(null);
  const [log, setLog] = useState(null);
  const [foods, setFoods] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const db =
      firebase.auth() && firebase.auth().currentUser
        ? firebase
            .database()
            .ref("users/" + firebase.auth().currentUser.uid + "/log")
        : null;

    const handleData = (snapshot) => {
      if (snapshot.val()) {
        setLog(snapshot.val());
      }
    };
    db.on("value", handleData, (error) => alert(error));
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
      const built = Object.keys(log.foods).map((food) => log.foods[food].fdcId);
      fetchFoods(admin.apikey, built).then((value) => {
        if (!foods) {
          setFoods(value);
        }
      });
      //console.log(getFood(admin.apikey, "milk"));
    }
  }, [admin, log]);

  useEffect(() => {
    if (log && foods) {
      setData(dailySumming(log, foods));
    }
  }, [log, foods]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data ? (
        <>
          <View style={{ textAlign: "center" }}>
            <Text style={{ fontSize: 30 }}>Weekly Summary</Text>
          </View>

          <WeeklyMacroChart data={data} />
          <VitaminsAndMinerals data={data} />
          <Recommendations data={data} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.cream,
    alignItems: "center",
    //justifyContent: "space-evenly",
  },
});

export default SummaryScreen;
