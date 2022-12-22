import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost } from "../redux/Actions/Post";
import { colors } from "../constants/Colors";

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
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flex: 0.1 }}
        onPress={() => {
          navigation.navigate("UserProfile", userId);
        }}
      >
        <Image
          source={{
            uri: avatar,
          }}
          style={{ height: 50, width: 50, borderRadius: 25 }}
        />
      </TouchableOpacity>
      {/* {isAccount ? (
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
      ) : null} */}

      <View style={styles.nameCon}>
        <View style={{ paddingHorizontal: 0 }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 8,
            }}
            onPress={() => {
              navigation.navigate("UserProfile", userId);
            }}
          >
            <Text style={styles.name}>{name}</Text>
          </TouchableOpacity>
          <View
            style={{
              padding: 10,
            }}
          >
            <Text style={styles.comment}>{comment}</Text>
          </View>
        </View>
        {isAccount ? (
          <Icons
            onPress={() => {
              deleteHandler();
            }}
            name="delete"
            size={25}
            color="red"
            style={{ paddingRight: 10 }}
          />
        ) : userId === user._id ? (
          <Icons
            onPress={() => {
              deleteHandler();
            }}
            name="delete"
            size={25}
            color="red"
            style={{ paddingRight: 10 }}
          />
        ) : null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 20,
    width: "100%",
  },
  name: {
    marginLeft: "3%",
    color: colors.textPrimary,
    fontWeight: "700",
  },
  nameCon: {
    flex: 0.8,
    marginLeft: 20,
    backgroundColor: colors.input,
    height: null,
    padding: 2,
    paddingTop: 10,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  comment: {},
});
export default CommentCard;
