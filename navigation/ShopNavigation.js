import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import Colors from "../constants/Colors";
import ProductOverView from "../screens/shop/ProductOverView";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";

const Stack = createStackNavigator();

function ProductNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:
            Platform.OS === "ios" ? "white" : Colors.primaryColor,
        },
        headerTitleStyle: {
          fontFamily: "poppins-bold",
        },
        headerBackTitleStyle: {
          fontFamily: "poppins-regular",
        },
        headerTintColor: Platform.OS === "ios" ? Colors.primaryColor : "white",
      }}
    >
      <Stack.Screen name="All Products" component={ProductOverView} />
      <Stack.Screen name="ProductsDetails" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
}

export default ProductNavigator;
