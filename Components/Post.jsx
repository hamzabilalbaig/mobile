import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "react-native-paper";
import UserSearch from "./UserSearch";
import Icons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost, updatePost } from "../redux/Actions/Post";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/Colors";
import { getMyPosts, loadUser } from "../redux/Actions/User";
const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
}) => {
  const { user } = useSelector((state) => state.user);
  const [like, setLiked] = useState(false);
  const [num, setNum] = useState(0);
  const [modal, setModal] = useState(false);
  const [editCaption, setEditCaption] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);
  const handleLike = () => {
    setLiked(!like);
    if (like && num === 0) {
      setNum(-1);
    } else if (!like && num === -1) {
      setNum(0);
    } else if (like && num === 1) {
      setNum(0);
    } else if (!like && num === 0) {
      setNum(1);
    }

    dispatch(likePost(postId));
  };

  const editCaptionHandler = () => {
    dispatch(updatePost(editCaption, postId));
    alert("Post Updated");
    dispatch(getMyPosts());
  };

  const postDeleteHandler = () => {
    Alert.alert(
      "Delete Post",
      "Are you Sure You want to delete this Post?",
      [
        {
          text: "YES",
          onPress: async () => {
            await dispatch(deletePost(postId));
            await dispatch(loadUser());
            alert("Post Deleted");
            setIsDeleted(true);
            await dispatch(getMyPosts());
          },
        },
        {
          text: "NO",
          onPress: () => console.log("no pressed"),
        },
      ],
      {
        cancelable: true,
      }
    );
  };
  return !isDeleted ? (
    <View style={{ flex: 1, backgroundColor: "#F5F4F2", paddingTop: 20 }}>
      <View
        style={{
          backgroundColor: "#fff",
          marginHorizontal: 15.5,
          borderRadius: 20,
          padding: 10,
          elevation: 2,
          marginBottom: 10,
        }}
      >
        <UserSearch userId={ownerId} name={ownerName} avatar={ownerImage} />

        <View style={styles.imageCon}>
          <Image
            style={styles.image}
            source={{
              uri: postImage,
            }}
          />
        </View>
        <Text style={styles.text}>{caption}</Text>
        <View style={styles.infoCon}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Comments", {
                comments: comments,
                id: postId,
                isAccount: isAccount,
              });
            }}
            style={styles.info}
          >
            <Icons name="mode-comment" size={30} color="#B0AAB5" />
            <Text style={{ fontWeight: "400", color: "#1B1E23" }}>
              {"  " + comments.length}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "30%",
              height: 40,
              backgroundColor: "#EDEDED",
              borderRadius: 10,
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Icons
              onPress={() => handleLike()}
              name={!like ? "favorite-border" : "favorite"}
              size={30}
              color="red"
            />
            <Text
              onPress={() => {
                navigation.navigate("Likes", likes);
              }}
              style={styles.likeText}
            >
              {" " + (likes.length + num)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoCon}>
          {isDelete && (
            <TouchableOpacity
              onPress={() => {
                postDeleteHandler();
              }}
              style={styles.info}
            >
              <Icons name="delete-outline" size={30} color="red" />

              <Text>delete</Text>
            </TouchableOpacity>
          )}

          {isAccount && (
            <TouchableOpacity
              onPress={() => {
                setModal(!modal);
              }}
              style={styles.info}
            >
              <Modal
                animationType="slide"
                transparent={false}
                visible={modal}
                onRequestClose={() => {
                  setModal(!modal);
                }}
              >
                <View>
                  <View style={styles.header}>
                    <Icons
                      onPress={() => {
                        setModal(!modal);
                      }}
                      name="close"
                      size={30}
                      color="red"
                    />

                    <Text style={styles.title}>Edit Caption </Text>
                    <Icons
                      name="close"
                      size={30}
                      color={colors.lightBackground}
                    />
                  </View>
                  <TextInput
                    multiline={true}
                    style={styles.input}
                    value={caption}
                    placeholder="Enter your Caption"
                    onChangeText={(e) => setEditCaption(e)}
                  />
                  <Button
                    style={styles.comment}
                    mode="contained"
                    color="blue"
                    onPress={() => editCaptionHandler()}
                  >
                    Post
                  </Button>
                </View>
              </Modal>
              <Icons name="edit" size={30} color="blue" />

              <Text>edit </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  ) : (
    <View></View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    borderRadius: 14,
  },
  imageCon: {
    justifyContent: "center",
    alignItems: "center",

    paddingTop: 10,
  },
  infoCon: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: "2%",

    // marginTop: "4%",
  },
  info: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    paddingVertical: 10,
    paddingLeft: 5,
    fontSize: 16,
    fontWeight: "600",
    color: "#3B3B3B",
  },
  likeText: {
    color: "#1B1E23",
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  title: {
    fontSize: 25,
    color: "blue",
    marginHorizontal: "20%",
    color: colors.textPrimary,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: colors.input,
    borderRadius: 15,
    elevation: 2,
    height: 70,
    width: "100%",
    textAlign: "center",
    // marginLeft: "5%",
    // marginRight: "1%",
    // marginBottom: "4%",
    // marginTop: "6%",
  },
  comment: {
    borderRadius: 45,
    elevation: 10,
    height: 40,
    width: "100%",
    textAlign: "center",
    // marginLeft: "5%",
    // marginRight: "1%",
    // marginBottom: "4%",
    color: "blue",
  },
});

export default Post;
