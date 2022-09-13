import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost } from "../redux/Actions/Post";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteCommentOnPost(postId, commentId));
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("UserProfile", userId);
      }}
    >
      <Avatar.Image
        size={50}
        source={{
          uri: avatar,
        }}
      />
      {isAccount ? (
        <Icons
          onPress={() => {
            deleteHandler();
          }}
          name="delete"
          size={40}
          color="red"
        />
      ) : userId === user._id ? (
        <Icons
          onPress={() => {
            deleteHandler();
          }}
          name="delete"
          size={40}
          color="red"
        />
      ) : null}

      <View style={styles.nameCon}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.comment}>{comment}</Text>
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
  },
  comment: {
    marginLeft: "3%",
  },
});
export default CommentCard;
