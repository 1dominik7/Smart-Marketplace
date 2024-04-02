import CategoryList from "@components/CategoryList";
import LatestProductList, {
  LatestProduct,
} from "@components/LatestProductList";
import SearchBar from "@components/SearchBar";
import SearchModal from "@components/SearchModal";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import ChatNotification from "@ui/ChatNotification";
import size from "@utils/size";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import useAuth from "app/hooks/useAuth";
import useClient from "app/hooks/useClient";
import { AppStackParamList } from "app/navigator/AppNavigator";
import socket, { handleSocketConnection } from "app/socket";
import {
  ActiveChat,
  addNewActiveChats,
  getUnreadChatsCount,
} from "app/store/chats";
import { FC, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface Props {}

const Home: FC<Props> = (props) => {
  const [products, setProducts] = useState<LatestProduct[]>([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const { authClient } = useClient();
  const { authState } = useAuth();
  const dispatch = useDispatch();
  const totalUnreadMessages = useSelector(getUnreadChatsCount);

  const fetchLatestProduct = async () => {
    const res = await runAxiosAsync<{ products: LatestProduct[] }>(
      authClient.get("/product/latest")
    );
    if (res?.products) {
      setProducts(res.products);
    }
  };

  const fetchLastChats = async () => {
    const res = await runAxiosAsync<{
      chats: ActiveChat[];
    }>(authClient("/conversation/last-chats"));

    if (res) {
      dispatch(addNewActiveChats(res.chats));
    }
  };

  useEffect(() => {
    fetchLatestProduct();
    fetchLastChats();
  }, []);

  useEffect(() => {
    if (authState.profile) handleSocketConnection(authState.profile, dispatch);
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <ChatNotification
        onPress={() => navigate("Chats")}
        indicate={totalUnreadMessages > 0}
      />
      <ScrollView style={styles.container}>
        <SearchBar asButton onPress={() => setShowSearchModal(true)} />
        <CategoryList
          onPress={(category) => navigate("ProductList", { category })}
        />
        <LatestProductList
          data={products}
          onPress={({ id }) => navigate("SingleProduct", { id })}
        />
      </ScrollView>
      <SearchModal visible={showSearchModal} onClose={setShowSearchModal} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: size.padding,
    flex: 1,
  },
});

export default Home;
