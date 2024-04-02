import AvatarView from "@ui/AvatarView";
import colors from "@utils/colors";
import { formatDate } from "@utils/date";
import size from "@utils/size";
import { FC } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

interface Props {
  avatar?: string;
  name: string;
  timestamp: string;
  lastMessage: string;
  unreadMessageCount: number;
}

const { width } = Dimensions.get("window");

const profileImageSize = 50;
const itemWidth = width - size.padding * 2;
const seperatorWidth = width - profileImageSize - size.padding * 3;

const RecentChat: FC<Props> = ({
  avatar,
  name,
  unreadMessageCount,
  timestamp,
  lastMessage,
}) => {
  const showNotification = unreadMessageCount > 0;

  return (
    <View style={styles.container}>
      <AvatarView uri={avatar} size={profileImageSize} />
      <View style={styles.chatInfo}>
        <View style={styles.flexJustyfyBetween}>
          <View style={styles.flex1}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {name}
            </Text>
          </View>
          <Text
            style={showNotification ? styles.activeText : styles.inActiveText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {formatDate(timestamp)}
          </Text>
        </View>
        <View style={styles.flexJustyfyBetween}>
          <View style={styles.flex1}>
            <Text
              style={styles.commonText}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {lastMessage}
            </Text>
          </View>
          {showNotification ? (
            <View style={styles.msgIndicator}>
              <Text style={styles.msgIndicatorCount}>{unreadMessageCount}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export const Seperator = () => <View style={styles.seperator} />;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: itemWidth,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.primary,
    marginRight: size.padding,
  },
  chatInfo: {
    width: itemWidth - profileImageSize,
    paddingLeft: size.padding,
  },
  commonText: {
    fontSize: 12,
    color: colors.primary,
  },
  flexJustyfyBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flex1: {
    flex: 1,
  },
  msgIndicatorCount: {
    fontSize: 12,
    color: colors.white,
  },
  msgIndicator: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.active,
    alignItems: "center",
    justifyContent: "center",
  },
  activeText: {
    fontSize: 12,
    color: colors.active,
  },
  inActiveText: {
    fontSize: 12,
    color: colors.primary,
  },
  seperator: {
    width: seperatorWidth,
    height: 1,
    backgroundColor: colors.deActive,
    alignSelf: "flex-end",
    marginVertical: 15,
  },
});

export default RecentChat;
