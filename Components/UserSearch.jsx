import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getUserPosts, getUserProfile } from "../redux/Actions/User";

const UserSearch = ({ userId, name, avatar }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        dispatch(getUserPosts(userId));
        dispatch(getUserProfile(userId));

        navigation.navigate("Account", userId);
      }}
    >
      <Avatar.Image
        size={50}
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
export default UserSearch;
