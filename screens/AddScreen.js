import React, { useState, useEffect } from 'react';
import { firebase } from "../firebase.js";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import theme from "../utils/theme";
import { getFood, fetchFoods } from "../utils/usda";


const AddScreen = ({navigation}) => {
    const [results, setResults] = useState([]);
    const [admin, setAdmin] = useState(null);

    const toDetails = (result) => {
        navigation.navigate('FoodDetailScreen', { result, admin });
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
            <SafeAreaView styles={{width: 300, justifyContent: 'center'}}>
                <SearchBar admin={admin} results={results} setResults={setResults}></SearchBar>
                <SearchResults toDetails={toDetails} results={results}></SearchResults>

            </SafeAreaView>
        </ScrollView>
    )
}

const Banner = () => {
    return (
        <View style={styles.banner}>
            <Text>Search for food below!</Text>
        </View>
    )
}

const SearchBar = ({admin, results, setResults}) => {
    const [value, onChangeText] = useState('');


    async function handleFood () {
        if (admin) {
            console.log("REPEAT")
            return getFood(admin.apikey, value);
        } else {
            console.log("Admin invalid");
        }
    }

    useEffect(()=> {
        console.log(results);
    },[results])

    return (
        <View 
        >
            <TextInput
                style={styles.searchBar}
                onChangeText={text => onChangeText(text)}
                returnKeyType={'search'}
                placeholder={'e.g. banana'}
                value={value}
                onSubmitEditing={()=> handleFood().then((value) => setResults(value))}
                
            />
        </View>
    )
}


const SearchResult = ({result, toDetails}) => {
    return (
        <TouchableOpacity style={styles.searchResult} onPress={()=> toDetails(result)}>
            <Text>{result.description}</Text>
        </TouchableOpacity>
    )
}

const SearchResults = ({results, toDetails}) => {
    return results.hasOwnProperty('foods') ? 
        <ScrollView contentContainerStyle={styles.searchResults}>
            {results.foods.map(result => {
                return <SearchResult result={result} toDetails={toDetails}></SearchResult> 
            })}
        </ScrollView>
        : null
    
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.cream,
      margin: 'auto',
      alignItems: "center",
      justifyContent: "flex-start",
      width: 400,
      flexGrow: 1,
    },
    banner: {
      marginTop: 100,
      marginBottom: 50,
    },
    searchBar: {
      height: 40, 
      borderStyle: 'solid',
      borderWidth: 30,
      borderColor: 'gray', 
      borderRadius: 30,
      borderWidth: 1,
      marginBottom: 50,
      marginHorizontal: 50,
      textAlign: 'center',
    },
    searchResult: {
      textAlign: 'center',
      padding: 10,
      marginBottom: 5,
      borderWidth: 2,
      borderColor: 'black',
      borderStyle: 'solid',
      borderRadius: 30,
      marginHorizontal: 5,
      width: 300,
    },
  });
  

export default AddScreen;