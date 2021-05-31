import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./screens/Home";
import AboutScreen from "./screens/About";
import HistoryScreen from "./screens/History";
import CategoryScreen from "./screens/Category";
import TypeScreen from "./screens/Type";

export default function Navigation() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="Type" component={TypeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
