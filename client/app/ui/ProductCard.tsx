import { FC } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { formatPrice } from "@utils/helper";
import colors from "@utils/colors";
import { LatestProduct } from "@components/LatestProductList";

interface Props {
  product: LatestProduct;
  onPress(item: LatestProduct): void;
}

const ProductCard: FC<Props> = ({ product, onPress }) => {
  return (
    <Pressable onPress={() => onPress(product)} style={styles.productContainer}>
      {product.thumbnail ? (
        <Image source={{ uri: product.thumbnail }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, styles.noImageView]}>
          <MaterialCommunityIcons
            name="image-off"
            size={35}
            color={colors.primary}
          />
        </View>
      )}
      <Text style={styles.price}>{formatPrice(product.price)}</Text>
      <Text style={styles.name}>{product.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    padding: 7,
  },
  thumbnail: {
    width: "100%",
    height: 100,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  noImageView: {
    backgroundColor: colors.deActive,
    alignItems: "center",
    justifyContent: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.active,
    paddingVertical: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
});

export default ProductCard;
