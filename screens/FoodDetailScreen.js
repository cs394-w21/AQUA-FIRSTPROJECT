import React, { useState, useEffect } from 'react';
import { firebase } from "../firebase.js";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import theme from "../utils/theme";
import { Picker } from '@react-native-picker/picker';
import { getFood, fetchFoods, getFoodByFDCID } from "../utils/usda";


const Banner = () => {
    return (<Text>Food Name</Text>)
}



const PortionSizes = ({options}) => {
    const [portionSize, setPortionSize] = useState("java");
    return (
        <View>
            <Picker
                selectedValue={portionSize}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setPortionSize(itemValue)}
            >
            {options.map(value => <Picker.Item label={value} value={value}/>)}
            </Picker>
        </View>
    )
}




const FoodDetailScreen = ({route}) => {
    const result = route.params.result;
    const admin = route.params.admin;
    console.log("result FROM ADD SCREEN:", result);
    console.log("apikey FROM ADD SCREEN:", admin);
    useEffect(()=> {
        if (result && admin) {
            getFoodByFDCID(admin.apikey, result.fdcId).then((value)=> console.log(value));
        }
    },[result, admin])




    return ( 
        <View> 
        </View>
    )
}

export default FoodDetailScreen;