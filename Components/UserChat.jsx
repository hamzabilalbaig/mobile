import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUserProfile,
  getMessages,
  getUserPosts,
  getUserProfile,
} from "../redux/Actions/User";
import Loader from "./Loader";

const UserChat = ({ userId, conversationId }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user, loading: userLoading } = useSelector(
    (state) => state.userProfile
  );
  useEffect(async () => {
    await dispatch(clearUserProfile());
    await dispatch(getUserProfile(userId));
  }, [dispatch]);

  return userLoading ? (
    <Loader />
  ) : (
    <TouchableOpacity
      style={styles.container}
      onPress={async () => {
        await dispatch(getMessages(conversationId));

        navigation.navigate("Chat", {
          name: user.name,
          avatar: user.avatar.url,
        });
      }}
    >
      <Avatar.Image
        size={50}
        source={{
          uri: avatar.url,
        }}
      />
      <View style={styles.nameCon}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 30,
    width: "100%",
  },
  name: {
    marginLeft: "3%",
    color: "blue",
    fontWeight: "700",
  },
  nameCon: {
    width: "100%",
    justifyContent: "center",
  },
});
export default UserChat;
