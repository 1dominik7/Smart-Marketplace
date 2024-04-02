import { useNavigation } from "@react-navigation/native";
import size from "@utils/size";
import { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface Props {
  backButton?: JSX.Element | null;
  center?: JSX.Element | null;
  right?: JSX.Element | null;
}

const AppHeader: FC<Props> = ({ center, right, backButton }) => {

    const {goBack, canGoBack} = useNavigation()

  return (
    <View style={styles.container}>
      {canGoBack() && <Pressable onPress={goBack}>{backButton}</Pressable>}
      {center}

      {right}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: size.padding,
  },
});

export default AppHeader;
