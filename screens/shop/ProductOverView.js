import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  FlatList,
  Text,
  Platform,
  ActivityIndicator,
  View,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";
import HeaderButton from "../../components/UI/HeaderButton";
import CustomButton from "../../components/UI/CustomButton";
import Colors from "../../constants/Colors";

const ProductOverView = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductsDetails", {
      productId: id,
      productTitle: title,
    });
  };

  useLayoutEffect(() => {
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

  const loadProducts = useCallback(async () => {
    console.log("LOAD PRODUCTS");
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("focus", loadProducts);

    console.log(willFocusSub);

    return willFocusSub;
  }, [loadProducts]);

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontFamily: "poppins-bold" }}>An error occured!</Text>
        <CustomButton onPress={loadProducts}>
          <Text>Try Again!</Text>
        </CustomButton>
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          size="large"
          color={Colors.primaryColor}
        ></ActivityIndicator>
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontFamily: "poppins-italic" }}>
          No products found. Maybe start adding some
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          imageUrl={itemData.item.imageUrl}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <CustomButton
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          >
            View Details
          </CustomButton>
          <CustomButton
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          >
            To Cart
          </CustomButton>
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default ProductOverView;
