import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import CustomButton from "../../components/UI/CustomButton";

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.mainText}>{props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={{ ...styles.mainText, marginHorizontal: 15 }}>
          ${props.amount.toFixed(2)}
        </Text>
        {props.deletable && (
          <CustomButton onPress={props.onRemove} style={styles.deleteButton}>
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color={Platform.OS === "android" ? "white" : "red"}
            />
          </CustomButton>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontFamily: "poppins-regular",
    color: "gray",
    fontSize: 16,
  },
  mainText: {
    fontFamily: "poppins-bold",
    fontSize: 16,
  },
  deleteButton: { marginLeft: 20, backgroundColor: "white" },
});
export default CartItem;
