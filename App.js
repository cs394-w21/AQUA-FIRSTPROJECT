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
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Login = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
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
          tabBarIcon: () => (
            <MaterialIcons name="create" size={20}/>
          ),
        }}
      />
      <Tab.Screen
        component={SummaryScreen}
        name="Summary"
        options={{
          title: "Weekly Summary",
          tabBarIcon: () => (
            <MaterialIcons name="leaderboard" size={20}/>
          ),
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
        options={{ title: "Food Search", headerShown: false }}
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
