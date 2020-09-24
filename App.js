import React, { useState } from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import productsReducer from "./store/reducers/products";
import ShopNavigator from "./navigation/ShopNavigation";

const rootReducer = combineReducers({
  products: productsReducer,
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "poppins-italic": require("./assets/fonts/Poppins-Italic.ttf"),
    "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <ShopNavigator />
      </NavigationContainer>
    </Provider>
  );
}
