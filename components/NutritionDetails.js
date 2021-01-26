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
  return idResult ? (
    <View>
      <Text>Brand: {idResult.brandOwner}</Text>
      {nutrients()}
    </View>
  ) : null;
};
export default NutritionDetails;
