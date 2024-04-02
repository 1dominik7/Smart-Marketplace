import { FC } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "@utils/colors";

interface Props {
  asButton?: boolean;
  onPress?(): void;
  onChange?(text: string): void;
  value?: string;
}

const SearchBar: FC<Props> = ({ asButton, onChange, value, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <AntDesign name="search1" size={24} color={colors.primary} />
      {asButton ? (
        <View style={styles.textInput}>
          <Text style={styles.fakePlaceholder}>Search here...</Text>
        </View>
      ) : (
        <TextInput
          placeholder="Search here..."
          style={[styles.textInput, styles.textInputFont]}
          autoFocus
          onChangeText={onChange}
          value={value}
          onSubmitEditing={() => {}}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.primary,
    padding: 10,
  },
  textInput: {
    paddingLeft: 10,
    flex: 1,
  },
  textInputFont: {
    color: colors.primary,
    fontSize: 18,
  },
  fakePlaceholder: {
    color: colors.primary,
    fontSize: 18,
    opacity: 0.5,
    fontWeight: "200",
  },
});

export default SearchBar;
