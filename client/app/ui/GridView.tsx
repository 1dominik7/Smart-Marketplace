import { StyleSheet, Text, View } from "react-native";

interface Props<T> {
  data: T[];
  column?: number;
  renderItem(item: T): JSX.Element
}

const GridView = <T extends unknown>(props: Props<T>) => {
  const { data, column=2, renderItem } = props;
  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        return (
          <View style={{ width: `${100 / column}%` }} key={index}>
            {renderItem(item)}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
  },
});

export default GridView;
