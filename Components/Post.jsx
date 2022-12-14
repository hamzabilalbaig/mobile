import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "react-native-paper";
import UserSearch from "./UserSearch";
import Icons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost, updatePost } from "../redux/Actions/Post";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/Colors";
import {
  getMyPosts,
  getUserPosts,
  getUserProfile,
  loadUser,
} from "../redux/Actions/User";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRef } from "react";
import { Modalize } from "react-native-modalize";
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
  me,
}) => {
  const { fontScale } = useWindowDimensions();
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
    dispatch(getMyPosts());
  };

  const postDeleteHandler = () => {
    Alert.alert(
      "Delete Post",
      "Are you Sure You want to delete this Post?",
      [
        {
          text: "Yes",
          onPress: async () => {
            await dispatch(deletePost(postId));
            await dispatch(loadUser());

            setIsDeleted(true);
            await dispatch(getMyPosts());
          },
        },
        {
          text: "No",
          onPress: () => console.log("no pressed"),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const [state, setstate] = useState(false);
  const [editPost, seteditPost] = useState(false);

  const ModalRef = useRef(null);
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={[styles.container, { marginTop: 0 }]}
            onPress={async () => {
              await dispatch(getUserPosts(ownerId));
              await dispatch(getUserProfile(ownerId));
              navigation.navigate("Account", ownerId);
            }}
          >
            <Image
              style={{ height: 50, width: 50, borderRadius: 25 }}
              source={{
                uri: ownerImage,
              }}
            />
            <View style={styles.nameCon}>
              <Text style={styles.name}>{ownerName}</Text>
            </View>
          </TouchableOpacity>
          {me && (
            <TouchableOpacity
              onPress={() => setstate(!state)}
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 10,
              }}
            >
              <Feather name="edit" size={18} color="black" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.imageCon}>
          <Image
            style={styles.image}
            source={{
              uri: postImage,
            }}
          />
        </View>
        {state ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: colors.input,
              borderRadius: 8,
              elevation: 2,
              height: null,
              width: "100%",
              paddingVertical: 10,
              paddingHorizontal: 20,
              marginBottom: 20,
            }}
          >
            <TextInput
              multiline={true}
              style={{
                width: "70%",
                fontSize: 16,
              }}
              defaultValue={caption}
              // value={editCaption}
              placeholder="Edit your Caption"
              onChangeText={(e) => {
                setEditCaption(e);
                seteditPost(true);
              }}
            />
            <TouchableOpacity
              onPress={() => editCaptionHandler()}
              style={{
                height: 30,
                backgroundColor: colors.primary,
                borderRadius: 30 / 2,
                width: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="done-outline" size={18} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.text}>{caption}</Text>
        )}

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
            onPress={() => {
              navigation.navigate("Likes", {
                likes: likes,
                id: postId,
                isAccount: isAccount,
              });
            }}
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
            <TouchableOpacity onPress={() => handleLike()}>
              <Icons
                name={!like ? "favorite-border" : "favorite"}
                size={30}
                color="red"
              />
            </TouchableOpacity>
            <Text
              onPress={() => {
                navigation.navigate("Likes", likes);
              }}
              style={styles.likeText}
            >
              {" " + (likes.length + num)}
            </Text>
          </TouchableOpacity>
          {isDelete && (
            <TouchableOpacity
              onPress={() => {
                postDeleteHandler();
              }}
              style={styles.info}
            >
              <Icons name="delete-outline" size={30} color="red" />
            </TouchableOpacity>
          )}

          {/* <TouchableOpacity onPress={() => ModalRef.current.open()}>
            <Ionicons name="md-ellipsis-vertical" size={24} color="black" />
          </TouchableOpacity> */}
        </View>

        {/* <View style={styles.infoCon}>
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
                    defaultValue={caption}
                    // value={editCaption}
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
        </View> */}
      </View>

      <Modalize ref={ModalRef} HeaderComponent={<></>} snapPoint={350}>
        <View
          style={{
            marginHorizontal: 29,
            position: "absolute",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={() => {
            //   EditModal.current?.open();
            //   MainModal.current?.close();
            // }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 50,
            }}
          >
            <MaterialIcons name="edit" color="#3B3B3B" size={20} />
            <Text
              style={{
                fontSize: 18 / fontScale,
                fontWeight: "600",
                color: "#3B3B3B",
                paddingLeft: 15,
              }}
            >
              Edit Post
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              backgroundColor: "#dcdcdc",
              height: 1,
              marginVertical: 5,
            }}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={() => {
            //   DeleteModal.current?.open();
            //   MainModal.current?.close();
            // }}
            style={{
              flexDirection: "row",
              //   justifyContent: "center",
              alignItems: "center",
              height: 50,
            }}
          >
            <MaterialIcons name="delete" color="#FF2323" size={20} />
            <Text
              style={{
                fontSize: 18 / fontScale,
                fontWeight: "600",
                color: "#FF2323",
                paddingLeft: 15,
              }}
            >
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </Modalize>
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
    paddingVertical: 18,
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
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    width: "55%",
    paddingVertical: 10,
  },
  name: {
    color: colors.textSecondary,
    fontWeight: "600",
    fontSize: 18,
  },
  nameCon: {
    width: "100%",
    justifyContent: "center",
    marginLeft: "5%",
  },
});

export default Post;
