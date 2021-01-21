import React from "react";
import { StyleSheet, View, Text } from "react-native";
import dailySumming from "../utils/dailySumming";
import theme from "../utils/theme";

const Recommendations = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{ marginBottom: "10px", marginTop: "10px", textAlign: "center" }}
      >
        Recommendations{"\n\n"}We recommend you eat some red meat.
      </Text>
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
  },
});
export default Recommendations;
