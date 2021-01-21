import React from "react";
import { StyleSheet, View, Text } from "react-native";
import dailySumming from "../utils/dailySumming";
import theme from "../utils/theme";

const recs = {
  Calcium: (
    <Text
      style={{
        margin: "10px",
      }}
    >
      A long-term calcium deficiency can lead to dental changes, cataracts,
      alterations in the brain, and osteoporosis, which causes the bones to
      become brittle. Try eating dairy products like milk, cheese, and yogurt.
      Seafoods, leafy greens, legumes, dried fruits, and tofu are also good
      sources of calcium.
    </Text>
  ),
  Iron: (
    <Text
      style={{
        margin: "10px",
      }}
    >
      An iron deficiency can cause shortness of breath, tiredness, and reduced
      concentration. Try eating beef, chicken, beans, tofu, cashews, or spinach.
    </Text>
  ),
  "Vitamin A": (
    <Text
      style={{
        margin: "10px",
      }}
    >
      A vitamin A deficiency can lead to vision loss and blindness. Try eating
      leafy green vegetables, carrots, sweet potatoes, eggs, or cantaloupe.
    </Text>
  ),
  "Vitamin C": (
    <Text
      style={{
        margin: "10px",
      }}
    >
      A vitamin C deficiency can lead to bleeding gums, frequent bruising and
      infections, poor wound healing, anemia, and scurvy. Try eating guavas,
      bell peppers, kiwifruit, strawberries, oranges, papayas, broccoli,
      tomatoes, kale, or snow peas.
    </Text>
  ),
};

const Recommendations = ({ deficiencies }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{ marginBottom: "10px", marginTop: "10px", textAlign: "center" }}
      >
        Recommendations
      </Text>
      {Object.values(deficiencies).map((deficiency) => {
        return recs[deficiency];
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.cream,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "300px",
  },
});
export default Recommendations;
