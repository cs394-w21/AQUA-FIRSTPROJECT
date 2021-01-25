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

const Banner = () => {
  return <Text>Food Name</Text>;
};

const PortionSizes = ({ naturalResult, idResult }) => {
  const [portionSize, setPortionSize] = useState("java");
  const determinePortionOptions = () => {
    if (idResult.foodPortions.length == 0) {
      return ["100 g"];
    }
    return Object.values(idResult.foodPortions).map((p) => {
      if (!("portionDescription" in p)) {
        return "" + p.amount + " " + p.modifier;
      } else if (p.portionDescription == "Quantity not specified") {
        return "" + p.gramWeight + " g";
      } else {
        return p.portionDescription;
      }
    });
  };
  const options = determinePortionOptions();
  return (
    <View>
      <Picker
        selectedValue={portionSize}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setPortionSize(itemValue)}
      >
        {options.map((value, idx) => (
          <Picker.Item label={value} value={value} key={idx} />
        ))}
      </Picker>
    </View>
  );
};

const FoodDetailScreen = ({ route }) => {
  const naturalResult = route.params.result;
  const admin = route.params.admin;
  const [idResult, setIdResult] = useState(null);

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
        <PortionSizes naturalResult={naturalResult} idResult={idResult} />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default FoodDetailScreen;
