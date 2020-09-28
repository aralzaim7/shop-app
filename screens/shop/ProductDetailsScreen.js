import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../components/UI/CustomButton";

import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";

const ProductDetailsScreen = (props) => {
  const productId = props.route.params.productId;
  const productTitle = props.route.params.productTitle;

  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.setOptions({
      //title: selectedProduct.title,
      title: productTitle,
    });
  }, [props.navigation]);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <CustomButton
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}
        >
          Add to Cart
        </CustomButton>
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  image: { width: "100%", height: Dimensions.get("window").height * 0.35 },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    fontFamily: "poppins-bold",
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: "poppins-regular",
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
});
export default ProductDetailsScreen;
