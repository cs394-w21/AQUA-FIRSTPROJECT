import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

const NutritionDetails = ({
  idResult,
  naturalResult,
  gramsPerPortion,
  quantity,
}) => {
  idResult ? console.log(idResult.brandOwner) : null;
  const grams = gramsPerPortion * quantity;
  const nutrients = () => {
    if (!idResult) return null;
    return (
      <>
        <Text>Nutrients:</Text>
        {idResult.foodNutrients.map((n, idx) => {
          return (
            <Text key={idx}>
              {n.nutrient.name}: {(n.amount * grams) / 100}{" "}
              {n.nutrient.unitName}
            </Text>
          );
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
export default NutritionDetails;
