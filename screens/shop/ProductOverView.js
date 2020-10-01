import React, { useEffect } from "react";
import { FlatList, Text, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import HeaderButton from "../../components/UI/HeaderButton";
import CustomButton from "../../components/UI/CustomButton";

const ProductOverView = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      title: "All Products",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            onPress={() => {
              props.navigation.navigate("Cart");
            }}
          />
        </HeaderButtons>
      ),
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [props.navigation]);

  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

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
            dispatch(cartActions.addToCart(itemData.item));
          }}
        >
          <CustomButton onPress={props.onViewDetail}>View Details</CustomButton>
          <CustomButton onPress={props.onAddToCart}>To Cart</CustomButton>
        </ProductItem>
      )}
    />
  );
};
export default ProductOverView;
