import { FC } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  images: string[];
  onPress?(item: string): void;
  onLongPress?(item: string): void;
  style?: StyleProp<ViewStyle>;
}

const HorizontalImageList: FC<Props> = ({
  images,
  style,
  onPress,
  onLongPress,
}) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      data={images}
      contentContainerStyle={style}
      renderItem={({ item }) => {
        return (
          <Pressable
            onPress={() => onPress && onPress(item)}
            onLongPress={() => onLongPress && onLongPress(item)}
            style={styles.listItem}
          >
            <Image style={styles.image} source={{ uri: item }} />
          </Pressable>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: 70,
    height: 70,
    borderRadius: 7,
    marginLeft: 5,
    overflow: "hidden",
  },
  image: {
    flex: 1,
  },
});

export default HorizontalImageList;
