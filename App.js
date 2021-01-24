import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddScreen from './screens/AddScreen';
import FoodDetailScreen from './screens/FoodDetailScreen';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="AddScreen"
          component={AddScreen}
          options={{title: 'Food Search'}}
        />
        <Stack.Screen
          name="FoodDetailScreen"
          component={FoodDetailScreen}
          options={{title: 'Details'}}/>
      </Stack.Navigator>
    </NavigationContainer>

  )
};
export default App;
