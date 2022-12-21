import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getUserPosts, getUserProfile } from "../redux/Actions/User";
import { colors } from "../constants/Colors";

const UserSearch = ({ userId, name, avatar, index }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.container, { marginTop: index === 0 ? "5%" : 0 }]}
      onPress={async () => {
        await dispatch(getUserPosts(userId));
        await dispatch(getUserProfile(userId));
        navigation.navigate("Account", userId);
      }}
    >
      <Image
        style={{ height: 50, width: 50, borderRadius: 25 }}
        source={{
          uri: avatar,
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
    marginHorizontal: 10,

    paddingVertical: 10,
    width: "100%",
  },
  name: {
    marginLeft: "3%",
    color: colors.textSecondary,
    fontWeight: "600",
    fontSize: 18,
  },
  nameCon: {
    width: "100%",
    justifyContent: "center",
  },
});
export default UserSearch;
