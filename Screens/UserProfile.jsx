import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  useWindowDimensions,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Components/Post";
import { getMyPosts, loadUser, logoutUser } from "../redux/Actions/User";
import Loader from "../Components/Loader";
import { Avatar, Button } from "react-native-paper";
import Icons from "react-native-vector-icons/MaterialIcons";
import { useState } from "react";
import UserSearch from "../Components/UserSearch";
import { Modalize } from "react-native-modalize";
import { useRef } from "react";
import { deletePost, likePost, updatePost } from "../redux/Actions/Post";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const UserProfile = ({ route }) => {
  const userId = route.params;
  const dispatch = useDispatch();
  const { fontScale } = useWindowDimensions();

  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const { user } = useSelector((state) => state.user);
  const [modalFollowers, SetModalFollowers] = useState(false);
  const [modalFollowing, SetModalFollowing] = useState(false);

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  const logoutHandler = async () => {
    await dispatch(logoutUser());
    alert("Logged Out Successfully");
  };

  const followerModalRef = useRef(null);
  const followingModalRef = useRef(null);

  const [like, setLiked] = useState(false);
  const [num, setNum] = useState(0);
  const [modal, setModal] = useState(false);
  const [editCaption, setEditCaption] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    posts?.map((i) => {
      i.likes.forEach((item) => {
        if (item._id === user._id) {
          setLiked(true);
        }
      });
    });
  }, [posts, user._id]);
  const handleLike = (id) => {
    setLiked(!like);
    if (like && num === 0) {
      setNum(0);
    } else if (!like && num === -1) {
      setNum(0);
    } else if (like && num === 1) {
      setNum(0);
    } else if (!like && num === 0) {
      setNum(1);
    }

    dispatch(likePost(id));
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

  const ModalRef = useRef(null);

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
          <View style={styles.header}></View>
          <View style={styles.profile}>
            <Avatar.Image
              size={150}
              source={{
                uri: user.avatar.url,
              }}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.profileName}>{user.name}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icons
              name="edit"
              size={20}
              color={colors.textPrimary}
              style={{ paddingRight: 7 }}
            />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditProfile", { image: user.avatar.url })
              }
              style={{ justifyContent: "center" }}
            >
              <Text style={{ textDecorationLine: "underline", fontSize: 15 }}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
          {/* <Button
            style={styles.buttons}
            mode="contained"
            color="blue"
            onPress={() => SetModalFollowers(!modalFollowers)}
          >
            Followers ({user.followers.length})
          </Button> */}
          <View style={styles.userInfoWrapper}>
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoTitle}>{user.posts.length}</Text>
              <Text style={styles.userInfoSubTitle}>Posts</Text>
            </View>
            <Pressable
              onPress={() => followerModalRef?.current.open()}
              style={styles.userInfoItem}
            >
              <Text style={styles.userInfoTitle}>{user.followers.length}</Text>
              <Text style={styles.userInfoSubTitle}>Followers</Text>
            </Pressable>
            <Pressable
              onPress={() => followingModalRef?.current.open()}
              style={styles.userInfoItem}
            >
              <Text style={styles.userInfoTitle}>{user.following.length}</Text>
              <Text style={styles.userInfoSubTitle}>Following</Text>
            </Pressable>
          </View>

          <View style={styles.userInfoWrapper}>
            <Button
              style={styles.buttons}
              mode="contained"
              color="tomato"
              onPress={() => logoutHandler()}
            >
              Log out
            </Button>
          </View>
          {/* <Text style={styles.posts}>Posts ({user.posts.length})</Text> */}
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <>
                <Post
                  key={post._id}
                  postId={post._id}
                  caption={post.caption}
                  postImage={post.image.url}
                  likes={post.likes}
                  comments={post.comments}
                  ownerImage={post.owner.avatar.url}
                  ownerName={post.owner.name}
                  ownerId={post.owner._id}
                  isAccount={true}
                  isDelete={true}
                  me={true}
                />
                {/* <View
                  style={{
                    flex: 1,
                    backgroundColor: "#F5F4F2",
                    paddingTop: 20,
                  }}
                >
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
                    <UserSearch
                      userId={post.owner._id}
                      name={post.owner.name}
                      avatar={post.owner.avatar.url}
                    />

                    <View style={styles.imageCon}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: post.image.url,
                        }}
                      />
                    </View>
                    <Text style={styles.text}>{post.caption}</Text>
                    <View style={styles.infoCon}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Comments", {
                            comments: post.comments,
                            id: post._id,
                            isAccount: true,
                          });
                        }}
                        style={styles.info}
                      >
                        <MaterialIcons
                          name="mode-comment"
                          size={30}
                          color="#B0AAB5"
                        />
                        <Text style={{ fontWeight: "400", color: "#1B1E23" }}>
                          {"  " + post.comments.length}
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
                        <TouchableOpacity onPress={() => handleLike(post._id)}>
                          <MaterialIcons
                            name={like ? "favorite" : "favorite-border"}
                            size={30}
                            color="red"
                          />
                        </TouchableOpacity>
                        <Text
                          onPress={() => {
                            navigation.navigate("Likes", post.likes);
                          }}
                          style={styles.likeText}
                        >
                          {" " + (post.likes.length + num)}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => ModalRef.current.open()}>
                        <Ionicons
                          name="md-ellipsis-vertical"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View> */}
              </>
            ))
          ) : (
            <Text>No posts Found</Text>
          )}
        </ScrollView>
      </SafeAreaView>
      <Modalize
        ref={followerModalRef}
        HeaderComponent={
          <View
            style={{
              marginHorizontal: 20,
              marginVertical: 5,
              borderBottomWidth: 0.5,
              borderBottomColor: "#9b9b9b",
            }}
          >
            <View
              style={{
                width: 95,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: colors.primary,
                borderBottomWidth: 1.5,
              }}
            >
              <Text style={{ fontWeight: "500", color: colors.primary }}>
                {`Followers  ${user.followers.length}`}
              </Text>
            </View>
          </View>
        }
        snapPoint={350}
      >
        <View style={{ paddingHorizontal: 5, paddingVertical: 10 }}>
          {user && user.followers.length > 0 ? (
            user.followers.map((follow) => (
              <UserSearch
                key={follow._id}
                userId={follow._id}
                name={follow.name}
                avatar={follow.avatar.url}
              />
            ))
          ) : (
            <Text style={{ margin: "2vmax" }}>There Are No Followers yet.</Text>
          )}
        </View>
      </Modalize>
      <Modalize
        ref={followingModalRef}
        HeaderComponent={
          <View
            style={{
              marginHorizontal: 20,
              marginVertical: 5,
              borderBottomWidth: 0.5,
              borderBottomColor: "#9b9b9b",
            }}
          >
            <View
              style={{
                width: 95,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: colors.primary,
                borderBottomWidth: 1.5,
              }}
            >
              <Text style={{ fontWeight: "500", color: colors.primary }}>
                {`Following  ${user.followers.length}`}
              </Text>
            </View>
          </View>
        }
        snapPoint={350}
      >
        <View style={{ paddingHorizontal: 5, paddingVertical: 10 }}>
          {user && user.following.length > 0 ? (
            user.following.map((follow) => (
              <UserSearch
                key={follow._id}
                userId={follow._id}
                name={follow.name}
                avatar={follow.avatar.url}
              />
            ))
          ) : (
            <Text style={{ margin: "2vmax" }}>You're not following anyone</Text>
          )}
        </View>
      </Modalize>
      <Modalize ref={ModalRef} HeaderComponent={<></>} snapPoint={150}>
        <View
          style={{
            marginHorizontal: 29,
            marginVertical: 15,
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
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  profile: {
    marginTop: "4%",
    alignSelf: "center",
    borderRadius: 360,
  },
  profileName: {
    marginVertical: 12,
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  buttons: {
    borderRadius: 12,
    elevation: 1,
    height: 40,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  posts: {
    fontSize: 20,
    fontWeight: "700",
    margin: "5%",
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  title: { fontSize: 25, color: "blue", marginHorizontal: "25%" },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
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
});
export default UserProfile;
