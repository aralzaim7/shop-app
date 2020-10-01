import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton";

const UserProductsScreen = (props) => {
  const useProducts = useSelector((state) => state.products.userProducts);

  useEffect(() => {
    props.navigation.setOptions({
      title: "Your Products",
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

  return (
    <FlatList
      data={useProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {}}
          onAddCart={() => {}}
        />
      )}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default UserProductsScreen;
