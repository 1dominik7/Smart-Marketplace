import AppHeader from "@components/AppHeader";
import RecentChat, { Seperator } from "@components/RecentChat";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import BackButton from "@ui/BackButton";
import EmptyView from "@ui/EmptyView";
import size from "@utils/size";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import useClient from "app/hooks/useClient";
import { ProfileNavigatorParamList } from "app/navigator/ProfileNavigator";
import {
  ActiveChat,
  getActiveChats,
  removeUnreadChatCount,
} from "app/store/chats";
import { FC, useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface Props {}

const Chats: FC<Props> = (props) => {
  const { authClient } = useClient();
  const { navigate } =
    useNavigation<NavigationProp<ProfileNavigatorParamList>>();
  const chats = useSelector(getActiveChats);
  const dispatch = useDispatch();

  const sendSeenRequest = (conversationId: string, peerId: string) => {
    runAxiosAsync(
      authClient.patch(`/conversation/seen/${conversationId}/${peerId}`)
    );
  };

  const onChatPress = (chat: ActiveChat) => {
    dispatch(removeUnreadChatCount(chat.id));
    sendSeenRequest(chat.id, chat.peerProfile.id);
    navigate("ChatWindow", {
      conversationId: chat.id,
      peerProfile: chat.peerProfile,
    });
  };

  if (!chats.length)
    return (
      <>
        <AppHeader backButton={<BackButton />} />
        <EmptyView title="There is not chats." />
      </>
    );

  return (
    <>
      <AppHeader backButton={<BackButton />} />
      <FlatList
        data={chats}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <Pressable onPress={() => onChatPress(item)}>
            <RecentChat
              name={item.peerProfile.name}
              avatar={item.peerProfile.avatar}
              timestamp={item.timestamp}
              lastMessage={item.lastMessage}
              unreadMessageCount={item.unreadChatCounts}
            />
          </Pressable>
        )}
        ItemSeparatorComponent={() => <Seperator />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: size.padding,
  },
});

export default Chats;
