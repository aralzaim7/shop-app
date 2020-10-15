import React from "react";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Platform, View, SafeAreaView, Text } from "react-native";

import Colors from "../constants/Colors";
import ProductOverView from "../screens/shop/ProductOverView";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import CustomButton from "../components/UI/CustomButton";

import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import { useDispatch } from "react-redux";

const ProductStack = createStackNavigator();

export const ProductNavigator = () => {
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
};

const OrderStack = createStackNavigator();

export const OrderNavigator = () => {
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
};

const AdminStack = createStackNavigator();

export const AdminNavigator = () => {
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
};

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      initialRouteName="Products"
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <CustomButton
                style={{
                  margin: 10,
                  alignItems: "center",
                }}
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                }}
              >
                <Text>Logout</Text>
              </CustomButton>
            </SafeAreaView>
          </View>
        );
      }}
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
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator
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
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerTitle: "Authentication" }}
      />
    </AuthStackNavigator.Navigator>
  );
};
