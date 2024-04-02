import colors from "@utils/colors";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  icon: JSX.Element;
  name: string;
}

const CategoryOption: FC<Props> = ({ icon, name }) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.categories}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    transform: [{ scale: 0.4 }],
  },
  categories: {
    color: colors.primary,
    paddingVertical: 10,
  },
});

export default CategoryOption;
