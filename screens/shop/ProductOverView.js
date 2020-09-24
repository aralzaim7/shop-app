import React, { useEffect } from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";

const ProductOverView = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      title: "All Products",
    });
  }, [props.navigation]);

  const products = useSelector((state) => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          imageUrl={itemData.item.imageUrl}
          price={itemData.item.price}
          onViewDetail={() => {
            props.navigation.navigate("ProductsDetails", {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            });
          }}
          onAddToCart={() => {
            console.log("Add to Cart");
          }}
        />
      )}
    />
  );
};
export default ProductOverView;
