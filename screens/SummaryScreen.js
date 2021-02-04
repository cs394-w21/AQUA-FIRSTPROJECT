import React, { useState, useEffect } from "react";
import { firebase } from "../firebase.js";
import { StyleSheet, View, Text } from "react-native";
import { getFood, fetchFoods } from "../utils/usda";
import VitaminsAndMinerals from "../components/VitaminsAndMinerals";
import theme from "../utils/theme";
import Recommendations from "../components/Recommendations.js";
import dailySumming from "../utils/dailySumming";
import { ScrollView } from "react-native-gesture-handler";
import MacroChart from "../components/MacroChart";


const Legend = () => {
  const keys = {
    "Protein": theme.red,
    "Fat": theme.lightYellow,
    "Carbohydrate": theme.orange
  }
  return (
    <View style={{flexDirection: 'row'}}>
      {Object.keys(keys).map((name) => {
        return (
          <View style={{flexDirection: 'row', padding: 5, alignItems: 'center'}}>
            <View style={{backgroundColor: keys[name], width: 10, height: 10}}></View>
            <Text>
              {' ' + name + ' '}
            </Text>
          </View>
        )
      })
      }
  </View>
  )
}
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

    const handleData = (snap) => {
      if (snap.val()) {
        setLog(snap.val());
      } else {
        setLog({});
      }
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
    console.log("data:", data);
  }, [foods,data]);

  useEffect(() => {
    if (admin && log && log.foods) {
      const built = Object.values(log.foods).map((food) => food.fdcId);
      fetchFoods(admin.apikey, built).then((value) => {
        setFoods(value);
        /*
        if (!foods) {
          setFoods(value);
        }
        */
      });
    }
  }, [admin, log]);

  useEffect(() => {
    if (log && foods) {
      setData(dailySumming(log, foods));
    }
  }, [log, foods]);

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ textAlign: "center" }}>
        <Text style={{ fontSize: 30 }}>Weekly Summary</Text>
        <Legend></Legend>
      </View>
      
      {data ? (
        <>
          <MacroChart data={data} />
          <VitaminsAndMinerals data={data} />
          <Recommendations data={data} />
        </>
      ) : (
        null
        //<WeeklyMacroChart data={[]} />
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
