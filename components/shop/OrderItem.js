import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import CartItem from "./CartItem";
import CustomButton from "../UI/CustomButton";
import Card from "../UI/Card";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
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
    </Card>
  );
};
const styles = StyleSheet.create({
  orderItem: {
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
