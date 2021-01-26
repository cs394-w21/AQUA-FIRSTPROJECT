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
  const db = firebase.database().ref("users/1x2y3z/log");
  const naturalResult = route.params.result;
  const admin = route.params.admin;
  const [idResult, setIdResult] = useState(null);
  const [gramsPerPortion, setGramsPerPortion] = useState(100);
  const [quantity, setQuantity] = useState(1);

  const Banner = () => {
    return <Text>{naturalResult.description}</Text>;
  };

  const buildDbObject = () => {
    const date = new Date();

    const obj = {
      fdcId: naturalResult.fdcId,
      grams: gramsPerPortion * quantity,
      quantity: quantity,
      quantityUnit: portionSize,
      time: date.toJSON(),
    };
    console.log(obj);
    return obj;
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
    <View>
      <Banner />
      {naturalResult && idResult ? (
        <View>
          <Quantity setQuantity={setQuantity} />
          <PortionSizes
            idResult={idResult}
            portionSize={portionSize}
            setPortionSize={setPortionSize}
            setGramValue={setGramsPerPortion}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => writeToDb()}
          >
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    height: 40,
    borderStyle: "solid",
    borderWidth: 30,
    borderColor: "gray",
    borderRadius: 30,
    borderWidth: 1,
    textAlign: "center",
    backgroundColor: "white",
  },
});

export default FoodDetailScreen;
