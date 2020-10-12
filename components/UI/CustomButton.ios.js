import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import Colors from "../../constants/Colors";

const CustomButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <View style={{ ...styles.button, ...props.style }}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
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
});

export default CustomButton;
