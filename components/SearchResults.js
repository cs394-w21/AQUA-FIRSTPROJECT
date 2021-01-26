import React from "react";
import { StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import theme from "../utils/theme";

const SearchResult = ({ result, toDetails }) => {
  return (
    <TouchableOpacity
      style={styles.searchResult}
      onPress={() => toDetails(result)}
    >
      <Text>
        {result.description}
        {"brandOwner" in result ? ", " + result.brandOwner : null}
      </Text>
    </TouchableOpacity>
  );
};

const SearchResults = ({ results, toDetails }) => {
  return results.hasOwnProperty("foods") ? (
    <ScrollView contentContainerStyle={styles.searchResults}>
      {results.foods.map((result) => {
        return (
          <SearchResult
            result={result}
            toDetails={toDetails}
            key={result.fdcId}
          ></SearchResult>
        );
      })}
    </ScrollView>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.cream,
    margin: "auto",
    alignItems: "center",
    justifyContent: "flex-start",
    width: 400,
    flexGrow: 1,
  },
  searchResult: {
    textAlign: "center",
    padding: 10,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: "black",
    borderStyle: "solid",
    borderRadius: 30,
    marginHorizontal: 5,
    width: 300,
  },
});

export default SearchResults;
