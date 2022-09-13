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
    <View>
      <UserSearch userId={ownerId} name={ownerName} avatar={ownerImage} />
      <Text style={styles.text}>{caption}</Text>
      <View style={styles.imageCon}>
        <Image
          style={styles.image}
          source={{
            uri: postImage,
          }}
        />
      </View>
      <View style={styles.infoCon}>
        <TouchableOpacity style={styles.info}>
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
            {" " +
              (likes.length + num) +
              (likes.length === 1 ? " like" : " likes")}
          </Text>
        </TouchableOpacity>
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
          <Icons name="comment" size={30} color="blue" />

          <Text>
            {"  " +
              comments.length +
              (comments.length === 1 ? " comment" : " comments")}
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
  ) : (
    <View></View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
  imageCon: {
    justifyContent: "center",
    alignItems: "center",
  },
  infoCon: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    margin: "2%",
    marginTop: "4%",
  },
  info: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    marginLeft: 40,
    marginBottom: 30,
    fontSize: 20,
  },
  likeText: {
    color: "red",
    fontWeight: "bold",
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  title: { fontSize: 25, color: "blue", marginHorizontal: "25%" },
  input: {
    backgroundColor: colors.input,
    borderRadius: 15,
    elevation: 10,
    height: 80,
    width: 320,
    textAlign: "center",
    marginLeft: "5%",
    marginRight: "1%",
    marginBottom: "4%",
    marginTop: "6%",
    color: "blue",
  },
  comment: {
    borderRadius: 45,
    elevation: 10,
    height: 40,
    width: 320,
    textAlign: "center",
    marginLeft: "5%",
    marginRight: "1%",
    marginBottom: "4%",
    color: "blue",
  },
});

export default Post;
