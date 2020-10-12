import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import CustomButton from "../../components/UI/CustomButton";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/order";

const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();


  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: "Your Cart",
    });
  }, [props.navigation]);

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? <ActivityIndicator size='small' color={Colors.primaryColor} /> : 
        <CustomButton
          style={{
            backgroundColor:
              cartItems.length === 0 ? "gray" : Colors.accentColor,
          }}
          disabled={cartItems.length === 0}
          onPress={sendOrderHandler}
        >
          <Text style={{ textAlign: "center" }}>Order Now</Text>
        </CustomButton>
  }
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
            deletable={true}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: { fontFamily: "poppins-bold", fontSize: 18 },
  amount: { color: Colors.primaryColor },
});
export default CartScreen;
