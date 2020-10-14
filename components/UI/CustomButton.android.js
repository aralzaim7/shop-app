import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Button,
  Dimensions,
} from "react-native";

import Colors from "../../constants/Colors";

const CustomButton = (props) => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }
  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent
        activeOpacity={0.6}
        onPress={props.onPress}
        disabled={props.disabled}
      >
        <View style={{ ...styles.button, ...props.style }}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Dimensions.get("window").height * 0.01,
    paddingHorizontal: Dimensions.get("window").width * 0.02,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontFamily: "poppins-bold",
    fontSize: 13,
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default CustomButton;
