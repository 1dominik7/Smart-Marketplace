import { FC, useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Keyboard,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "./SearchBar";
import colors from "@utils/colors";
import size from "@utils/size";
import EmptyView from "@ui/EmptyView";
import LottieView from "lottie-react-native";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import useClient from "app/hooks/useClient";
import { debounce } from "@utils/helper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "app/navigator/AppNavigator";

interface Props {
  visible: boolean;
  onClose(visible: boolean): void;
}

const searchResult = [
  { id: 1, name: "iphone 13 Pro max" },
  { id: 2, name: "iphone 14 Pro max" },
  { id: 3, name: "iphone 12 Pro max" },
  { id: 4, name: "Xiaomi 22" },
  { id: 5, name: "Samsung SE2022" },
  { id: 6, name: "iphone 9" },
  { id: 7, name: "Air pods" },
  { id: 8, name: "iphone 7 Pro max" },
  { id: 9, name: "Samsung SE2020" },
  { id: 10, name: "iphone 5 Pro max" },
];

type SearchResult = {
  id: string;
  name: string;
  thumbnail?: string;
};

const SearchModal: FC<Props> = ({ visible, onClose }) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [busy, setBusy] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const { authClient } = useClient();
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  const handleClose = () => {
    onClose(!visible);
  };

  const handleOnResultPress = (result: SearchResult) => {
    navigate("SingleProduct", { id: result.id });
    handleClose();
  };

  const searchProduct = async (query: string) => {
    if (query.trim().length >= 3) {
      return await runAxiosAsync<{ results: SearchResult[] }>(
        authClient.get("/product/search?name=" + query)
      );
    }
  };

  const searchDebounce = debounce(searchProduct, 300);

  const handleChange = async (value: string) => {
    setNotFound(false);
    setQuery(value);
    setBusy(true);
    const res = await searchDebounce(value);
    setBusy(false);
    if (res) {
      if (res.results.length) setResults(res.results);
      else setNotFound(true);
    }
  };

  useEffect(() => {
    const keyShowEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const keyHideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardWillHide";

    const keyShowListener = Keyboard.addListener(keyShowEvent, (e) => {
      setKeyboardHeight(e.endCoordinates.height + 10);
    });

    const keyHideListener = Keyboard.addListener(keyHideEvent, (e) => {
      setKeyboardHeight(0);
    });

    return () => {
      keyShowListener.remove();
      keyHideListener.remove();
    };
  }, []);

  return (
    <Modal animationType="fade" onRequestClose={handleClose} visible={visible}>
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <Pressable onPress={handleClose}>
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={colors.primary}
              />
            </Pressable>
            <View style={styles.searchBar}>
              <SearchBar onChange={handleChange} value={query} />
            </View>
          </View>

          {busy ? (
            <View style={styles.busyIconContainer}>
              <View style={styles.busyAnimationSize}>
                <LottieView
                  style={styles.flex1}
                  source={require("../../assets/loading_2.json")}
                  autoPlay
                  loop
                />
              </View>
            </View>
          ) : null}

          <View style={{ paddingBottom: keyboardHeight }}>
            <FlatList
              data={!busy ? results : []}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleOnResultPress(item)}
                  style={styles.searchResultItems}
                >
                  <Image
                    source={{ uri: item.thumbnail || undefined }}
                    style={styles.thumbnail}
                  />
                  <Text style={styles.suggestionListItem}>{item.name}</Text>
                </Pressable>
              )}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.suggestionList}
              ListEmptyComponent={
                notFound ? <EmptyView title="No results found..." /> : null
              }
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  searchResultItems: {
    flexDirection: "row",
    marginBottom: 7,
  },
  thumbnail: {
    width: 60,
    height: 40,
    marginRight: 10,
  },
  innerContainer: {
    padding: size.padding,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    marginLeft: size.padding,
  },
  suggestionList: {
    padding: size.padding,
  },
  suggestionListItem: {
    color: colors.primary,
    fontWeight: "600",
    paddingVertical: 7,
    fontSize: 18,
  },
  busyIconContainer: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
  },
  busyAnimationSize: {
    height: 100,
    width: 100,
  },
  flex1: {
    flex: 1,
  },
});

export default SearchModal;
