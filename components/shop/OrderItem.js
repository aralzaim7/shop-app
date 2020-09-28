import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import CartItem from "./CartItem";
import CustomButton from "../UI/CustomButton";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <CustomButton
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      >
        <Text style={{ textAlign: "center" }}>
          {showDetails ? "Hide Details" : "Show Details"}
        </Text>
      </CustomButton>

      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
              deletable={false}
            />
          ))}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  detailItems: { width: "100%" },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "poppins-bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: "poppins-regular",
    color: "#888",
  },
});
export default OrderItem;
