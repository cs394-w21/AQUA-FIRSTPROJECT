import React, { useState, useEffect } from "react";
import { firebase } from "../firebase.js";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import theme from "../utils/theme";
import { Picker } from "@react-native-picker/picker";
import { getFoodByFDCID } from "../utils/usda";
import PortionSizes from "../components/PortionSizes";

const Quantity = ({ setQuantity }) => {
  const [input, setInput] = useState(1);
  return (
    <>
      <Text>Qty:</Text>
      <TextInput
        style={styles.quantityInput}
        onChangeText={(text) => {
          setInput(text);
          Number(text)
            ? setQuantity(Number(text))
            : alert("Please enter a number for the quantity.");
        }}
        value={input}
        keyboardType={"number-pad"}
      ></TextInput>
    </>
  );
};

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
    let newFoodRef = foodsRef.push();
    const newFood = buildDbObject();
    newFoodRef.set(newFood);
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
  quantityInput: {
    height: 40,
    borderStyle: "solid",
    borderWidth: 30,
    borderColor: "gray",
    borderRadius: 30,
    borderWidth: 1,
    textAlign: "center",
    backgroundColor: "white",
  },
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
