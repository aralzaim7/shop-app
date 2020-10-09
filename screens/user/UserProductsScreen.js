import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton";
import CustomButton from "../../components/UI/CustomButton";
import Colors from "../../constants/Colors";
import * as productActions from "../../store/actions/products";

const UserProductsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const useProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (id) => {
    props.navigation.navigate("EditProductScreen", { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          setError(null);
          setIsLoading(true);
          try {
            await dispatch(productActions.deleteProduct(id));
          } catch (err) {
            setError(err.message);
          }
          setIsLoading(false);
        },
      },
    ]);
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: "Your Products",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add"
            iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
            onPress={() => {
              props.navigation.navigate("EditProductScreen");
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

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured!", error, [{ text: "Okay" }]);
    }
  }, [error]);

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

  return (
    <FlatList
      data={useProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <CustomButton
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          >
            Edit
          </CustomButton>
          <CustomButton onPress={() => deleteHandler(itemData.item.id)}>
            Delete
          </CustomButton>
        </ProductItem>
      )}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
export default UserProductsScreen;
