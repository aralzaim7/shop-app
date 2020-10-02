import React, { useState } from "react";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import { Platform } from "react-native";
import Colors from "../constants/Colors";
import ProductOverView from "../screens/shop/ProductOverView";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

const ProductStack = createStackNavigator();

function ProductNavigator() {
  return (
    <ProductStack.Navigator
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
      <ProductStack.Screen name="All Products" component={ProductOverView} />
      <ProductStack.Screen
        name="ProductsDetails"
        component={ProductDetailsScreen}
      />
      <ProductStack.Screen name="Cart" component={CartScreen} />
    </ProductStack.Navigator>
  );
}

const OrderStack = createStackNavigator();

function OrderNavigator() {
  return (
    <OrderStack.Navigator
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
      <OrderStack.Screen name="Orders" component={OrdersScreen} />
    </OrderStack.Navigator>
  );
}

const AdminStack = createStackNavigator();

function AdminNavigator() {
  return (
    <AdminStack.Navigator
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
      <AdminStack.Screen name="UserProducts" component={UserProductsScreen} />
      <AdminStack.Screen
        name="EditProductScreen"
        component={EditProductScreen}
      />
    </AdminStack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Products"
      drawerContentOptions={{
        activeTintColor: Colors.primaryColor,
      }}
    >
      <Drawer.Screen
        name="Products"
        component={ProductNavigator}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={focused ? Colors.primaryColor : "gray"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrderNavigator}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={focused ? Colors.primaryColor : "gray"}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={focused ? Colors.primaryColor : "gray"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
