import { style } from "d3";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

const NutrientInfo = ({ n, idx, grams }) => (
  <View style={styles.nutrientInfo}>
    <Text key={idx}>
      {n.nutrient.name}: {((n.amount * grams) / 100).toFixed(2)}{" "}
      {n.nutrient.unitName}
    </Text>
  </View>
);

const NutritionDetails = ({
  idResult,
  naturalResult,
  gramsPerPortion,
  quantity,
}) => {
  const grams = gramsPerPortion * quantity;
  const nutrients = () => {
    if (!idResult) return null;
    return (
      <>
        <Text style={{ fontSize: 20, marginTop: 10, marginBottom: 10 }}>
          Nutrients:
        </Text>
        {idResult.foodNutrients.map((n, idx) => {
          console.log("nutrient", n);
          return "amount" in n ? (
            <NutrientInfo n={n} idx={idx} grams={grams}></NutrientInfo>
          ) : null;
        })}
      </>
    );
  };
  const brand = () => {
    if (!idResult) return null;
    if (!("brandOwner" in idResult)) return null;
    return <Text>Brand: {idResult.brandOwner}</Text>;
  };
  return idResult ? (
    <View>
      {brand()}
      {nutrients()}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  nutrientInfo: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    flex: 1,
    fontSize: 15,
  },
});

export default NutritionDetails;
