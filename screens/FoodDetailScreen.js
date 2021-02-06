import React, { useState, useEffect } from "react";
import { firebase } from "../firebase.js";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import theme from "../utils/theme";
import { getFoodByFDCID } from "../utils/usda";
import PortionSizes from "../components/PortionSizes";
import Quantity from "../components/Quantity";
import NutritionDetails from "../components/NutritionDetails";

const FoodDetailScreen = ({ route }) => {
  const [portionSize, setPortionSize] = useState("100 g");
  const db =
    firebase.auth() && firebase.auth().currentUser
      ? firebase
          .database()
          .ref("users/" + firebase.auth().currentUser.uid + "/log")
      : null;
  const naturalResult = route.params.result;
  const admin = route.params.admin;
  const [idResult, setIdResult] = useState(null);
  const [gramsPerPortion, setGramsPerPortion] = useState(100);
  const [quantity, setQuantity] = useState(1);

  const Banner = () => {
    return <Text style={styles.banner}>{naturalResult.description}</Text>;
  };

  const buildDbObject = () => {
    const date = new Date();

    return {
      fdcId: naturalResult.fdcId,
      grams: gramsPerPortion * quantity,
      quantity: quantity,
      quantityUnit: portionSize,
      time: date.toJSON(),
    };
  };

  const writeToDb = () => {
    const foodsRef = db.child("foods");
    foodsRef.push().set(buildDbObject());
    alert("Food successfully added!");
  };

  useEffect(() => {
    console.log("this is idresult", idResult);
  }, [idResult]);

  useEffect(() => {
    if (naturalResult && admin) {
      getFoodByFDCID(admin.apikey, naturalResult.fdcId).then((value) =>
        setIdResult(value)
      );
    }
  }, [naturalResult, admin]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Banner />
      {naturalResult && idResult ? (
        <View>
          <View style={styles.inputs}>
            <Quantity setQuantity={setQuantity} />
            <PortionSizes
              idResult={idResult}
              portionSize={portionSize}
              setPortionSize={setPortionSize}
              setGramsPerPortion={setGramsPerPortion}
            />
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => writeToDb()}
          >
            <Text style={{ fontSize: 15 }}>Add</Text>
          </TouchableOpacity>
          <NutritionDetails
            idResult={idResult}
            naturalResult={naturalResult}
            gramsPerPortion={gramsPerPortion}
            quantity={quantity}
          />
        </View>
      ) : (
        <View>
          <Text>Loading... </Text>
          <Text>(Sometimes it can take a long time.)</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  addButton: {
    justifyContent: "center",
    height: 20,
    width: 40,
    marginTop: 5,
    borderStyle: "solid",
    borderWidth: 30,
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: 1,
    textAlign: "center",
    backgroundColor: theme.lightYellow,
  },
  banner: {
    fontSize: 25,
    marginTop: 10,
    marginBottom: 15,
  },
  container: {
    flex: 1,
    backgroundColor: theme.cream,
    alignItems: "center",
    flexGrow: 1,
    overflowX: 'scroll'
    //width: 400,
  },
  inputs: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default FoodDetailScreen;
