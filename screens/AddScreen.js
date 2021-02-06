import React, { useState, useEffect } from "react";
import { firebase } from "../firebase.js";
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
import theme from "../utils/theme";
import SearchResults from "../components/SearchResults";
import SearchBar from "../components/SearchBar";

const AddScreen = ({ navigation }) => {
  const [results, setResults] = useState([]);
  const [admin, setAdmin] = useState(null);

  const toDetails = (result) => {
    navigation.navigate("FoodDetailScreen", { result, admin });
  };


  useEffect(() => {
    const db = firebase.database().ref("admin");
    const handleData = (snap) => {
      if (snap.val()) {
        setAdmin(snap.val());
      }
    };
    db.on("value", handleData, (error) => console.log(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Banner></Banner>
      <View styles={{ width: 300, justifyContent: "center", backgroundColor: theme.cream}}>
        <SearchBar
          admin={admin}
          results={results}
          setResults={setResults}
        ></SearchBar>
        <SearchResults toDetails={toDetails} results={results}></SearchResults>
      </View>
    </ScrollView>
  );
};

const Banner = () => {
  return (
    <View style={styles.banner}>
      <Text>Search for food below!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.cream,
    margin: "auto",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "auto",
    flexGrow: 1,
    overflowX: 'scroll',
  },
  banner: {
    marginTop: 100,
    marginBottom: 50,
  },
});

export default AddScreen;
