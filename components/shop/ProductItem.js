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
import CustomButton from "../../components/UI/CustomButton";
import Card from "../../components/UI/Card";

const ProductItem = (props) => {
  let TouchableComp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }
  //useForeground TouchableOpacity ripple effectini önde uygulanmasını sağlar
  return (
    <Card style={styles.product}>
      <TouchableComp onPress={props.onSelect} useForeground>
        <View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: props.imageUrl }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>{props.children}</View>
        </View>
      </TouchableComp>
    </Card>
  );
};
const styles = StyleSheet.create({
  product: {
    height: Dimensions.get("window").height * 0.35,
    margin: 20,
  },
  imageContainer: {
    width: "100%",
    height: "55%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
  },
  details: { alignItems: "center", height: "23%", padding: 10 },
  title: { fontSize: 18, fontFamily: "poppins-bold" },
  price: { fontSize: 14, color: "#888", fontFamily: "poppins-italic" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "22%",
    paddingHorizontal: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
export default ProductItem;
