import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddScreen from "./screens/AddScreen";
import FoodDetailScreen from "./screens/FoodDetailScreen";
import SummaryScreen from "./screens/SummaryScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { firebase } from "./firebase";
import { SafeAreaView, Text } from "react-native";
//import MacroChart from "./components/MacroChart";
import MacroChart from "./components/OldMacroChart";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Login = createStackNavigator();

const App = () => {
  const [user, setUser] = useState("HfcKAa46gwMgH1EmUEIGM3uoTaK2");
  const [auth, setAuth] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((auth) => {
      setAuth(auth);
    });
  }, []);

  useEffect(() => {
    if (auth && auth.uid) {
      const db = firebase.database().ref("users").child(auth.uid);
      const handleData = (snap) => {
        setUser({ uid: auth.uid, ...snap.val() });
      };
      db.on("value", handleData, (error) => alert(error));
      return () => {
        db.off("value", handleData);
      };
    } else {
      setUser(null);
    }
  }, [auth]);

  return (
    <SafeAreaView style={{ marginLeft: 50 }}>
      <Text>Calories by day</Text>
      <MacroChart
        //keys={["apples", "bananas", "dates"]}
        //colors={["red", "yellow", "brown"]}
        data={[
          {
            label: "Jan",
            apples: 2000,
            bananas: 30,
            dates: 30,
          },
          {
            label: "Feb",
            apples: 30,
            bananas: 15,
            dates: 4,
          },
          {
            label: "Mar",
            apples: 30,
            bananas: 15,
            dates: 4,
          },
          {
            label: "Apr",
            apples: 30,
            bananas: 15,
            dates: 4,
          },
          {
            label: "Jun",
            apples: 30,
            bananas: 15,
            dates: 4,
          },
          {
            label: "Jul",
            apples: 30,
            bananas: 15,
            dates: 4,
          },
          {
            label: "Aug",
            apples: 30,
            bananas: 15,
            dates: 4,
          },
        ]}
      />
    </SafeAreaView>
    /*

    <NavigationContainer>
      <Login.Navigator>
        <Login.Screen
          component={LoginScreen}
          name="LoginScreen"
          options={{ title: "Login" }}
        />
        <Login.Screen
          component={SignUpScreen}
          name="signup"
          options={{ title: "Sign Up" }}
        />
        <Login.Screen
          component={mainApp}
          name="mainApp"
          options={{ headerShown: false }}
        />
      </Login.Navigator>
    </NavigationContainer>
    */
  );
};

const mainApp = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        component={logging}
        name="Logging"
        options={{
          title: "Log Foods",
        }}
      />
      <Tab.Screen
        component={SummaryScreen}
        name="Summary"
        options={{
          title: "Weekly Summary",
        }}
      />
    </Tab.Navigator>
  );
};

const logging = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddScreen"
        component={AddScreen}
        options={{ title: "Food Search" }}
      />
      <Stack.Screen
        name="FoodDetailScreen"
        component={FoodDetailScreen}
        options={{ title: "Details" }}
      />
    </Stack.Navigator>
  );
};
export default App;
