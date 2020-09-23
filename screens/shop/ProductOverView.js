import React from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

const ProductOverView = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ProductOverView;
