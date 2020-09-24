import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";
import Colors from "../../constants/Colors";

const ProductItem = (props) => {
  let TouchableComp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }
  //useForeground TouchableOpacity ripple effectini önde uygulanmasını sağlar
  return (
    <View style={{ borderRadius: 10 }}>
      <TouchableComp onPress={props.onViewDetail} useForeground>
        <View style={styles.product}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: props.imageUrl }} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>
            <Button
              color={Colors.primaryColor}
              title="View Details"
              onPress={props.onViewDetail}
            />
            <Button
              color={Colors.primaryColor}
              title="To Cart"
              onPress={props.onAddToCart}
            />
          </View>
        </View>
      </TouchableComp>
    </View>
  );
};
const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: Dimensions.get("window").height * 0.35,
    margin: 20,
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
  },
  details: { alignItems: "center", height: "20%", padding: 10 },
  title: { fontSize: 18, marginVertical: 4, fontFamily: "poppins-bold" },
  price: { fontSize: 14, color: "#888", fontFamily: "poppins-italic" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "20%",
    paddingHorizontal: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
export default ProductItem;
