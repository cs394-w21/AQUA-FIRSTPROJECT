import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddScreen from "./screens/AddScreen";
import FoodDetailScreen from "./screens/FoodDetailScreen";
import SummaryScreen from "./screens/SummaryScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
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
