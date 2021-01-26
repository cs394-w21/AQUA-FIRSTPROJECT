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
import { getFood, fetchFoods, getFoodByFDCID } from "../utils/usda";


const PortionSizes = ({ idResult, portionSize, setPortionSize, gramValue, setGramValue }) => {
  
  const determinePortionOptions = () => {
    if (idResult.foodPortions.length == 0) {
      return [{"100 g": 100}];
    }
    const portions = Object.values(idResult.foodPortions).map((p) => {
      if (!("portionDescription" in p)) {
        let s = "" + p.amount + " " + p.modifier + "";
        return {[s]: p.gramWeight};
      } else if (p.portionDescription == "Quantity not specified") {
        let s = "" + p.gramWeight + " g";
        return {[s]: p.gramWeight};
      } else {
        let s = p.portionDescription;
        return {[s]: p.gramWeight};
      }
    });
    if (! portions.includes({"100 g": 100})) {
      portions.push({"100 g": 100});
    }
    return portions;
  };
  const options = determinePortionOptions();
  return (
    <View>
      <Picker
        selectedValue={portionSize}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => {
          console.log(itemValue)
          setGramValue(options[itemIndex][itemValue])
          setPortionSize(itemValue)}
        }

      >
        {options.map((value, idx) => {
          return <Picker.Item label={Object.keys(value)[0]} value={Object.keys(value)[0]} key={idx} />
        })}
      </Picker>
    </View>
  );
};


const FoodDetailScreen = ({ route }) => {

  const [portionSize, setPortionSize] = useState("100 g");
  const db = firebase.database().ref("users/1x2y3z/log");
  const naturalResult = route.params.result;
  const admin = route.params.admin;
  const [idResult, setIdResult] = useState(null);
  const [gramValue, setGramValue] = useState(100);

  const Banner = () => {
    return <Text>{naturalResult.description}</Text>;
  };

  const buildDbObject = () => {
    const date = new Date();

    const obj = {
      fdcId: naturalResult.fdcId,
      grams: gramValue,
      quantity: 1,
      quantityUnit: portionSize,
      time: date.toJSON()
    }
    console.log(obj);
    return obj;
  }

  const writeToDb = () => {
    const foodsRef = db.child("foods");
    let newFoodRef = foodsRef.push();
    const newFood = buildDbObject();
    newFoodRef.set(newFood);

  }

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
          <PortionSizes
            idResult={idResult}
            portionSize={portionSize}
            setPortionSize={setPortionSize}
            gramValue = {gramValue}
            setGramValue = {setGramValue}
            />
          <TouchableOpacity onPress={()=> writeToDb()}>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default FoodDetailScreen;
