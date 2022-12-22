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
  Alert,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Components/Post";
import {
  deleteMyProfile,
  followAndUnfollowUser,
  getMyPosts,
  getUserPosts,
  getUserProfile,
  loadUser,
  logoutUser,
} from "../redux/Actions/User";
import Loader from "../Components/Loader";
import { Avatar, Button } from "react-native-paper";
import Icons from "react-native-vector-icons/MaterialIcons";
import { useState } from "react";
import UserSearch from "../Components/UserSearch";
import { NavigationActions } from "react-navigation";
import { CommonActions } from "@react-navigation/native";
import axios from "axios";
import { serverURL } from "../constants/Config";

const Account = ({ route, navigation }) => {
  const userId = route.params;
  const dispatch = useDispatch();

  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userProfile);
  const { user: me } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.userPosts);
  const [modalFollowers, SetModalFollowers] = useState(false);
  const [modalFollowing, SetModalFollowing] = useState(false);
  const [followingCheck, setFollowingCheck] = useState(false);

  useEffect(() => {
    if (me._id === userId) {
      navigation.navigate("UserProfile");
    }
    if (user.followers && !userLoading) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowingCheck(true);
          console.log("use", followingCheck);
        } else {
          setFollowingCheck(false);
          console.log("use", followingCheck);
        }
      });
    }
  }, [me, userId, user, userLoading, user.followers, me._id]);

  const CreateCon = () => {
    axios
      .post(`${serverURL}/createConversation`, {
        senderId: me._id,
        receiverId: userId,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(`con error ${e}`);
      });
  };

  const followingHandler = async () => {
    CreateCon();
    console.log(userId);
    setFollowingCheck(!followingCheck);
    console.log(followingCheck);
    await dispatch(followAndUnfollowUser(userId));
    await dispatch(getUserProfile(userId));
  };

  return loading || userLoading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          {/* <View style={styles.header}>
            <TouchableOpacity style={styles.other} onPress={() => sada}>
              <Icons name="delete-forever" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>Profile</Text>
            <TouchableOpacity style={styles.other} onPress={() => asdas}>
              <Icons name="edit" size={30} color="white" />
            </TouchableOpacity>
          </View> */}
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
          <View style={styles.userInfoWrapper}>
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoTitle}>{user.posts.length}</Text>
              <Text style={styles.userInfoSubTitle}>Posts</Text>
            </View>
            <Pressable
              // onPress={() => followerModalRef?.current.open()}
              style={styles.userInfoItem}
            >
              <Text style={styles.userInfoTitle}>{user.followers.length}</Text>
              <Text style={styles.userInfoSubTitle}>Followers</Text>
            </Pressable>
            <Pressable
              // onPress={() => followingModalRef?.current.open()}
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
              color={followingCheck ? "tomato" : "green"}
              onPress={() => followingHandler()}
            >
              {followingCheck ? "UnFollow" : "Follow"}
            </Button>
          </View>

          {/* <Text style={styles.posts}>Posts ({user.posts.length})</Text> */}
          {posts && posts.length > 0 ? (
            posts.map((post) => (
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
                me={false}
              />
            ))
          ) : (
            <Text>No posts Found</Text>
          )}
        </ScrollView>
      </SafeAreaView>
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
    elevation: 20,
    backgroundColor: "green",
    borderRadius: 360,
  },
  profileName: {
    marginTop: "3%",
    marginBottom: "3%",
    fontSize: 30,
    textAlign: "center",
  },
  buttons: {
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
  posts: {
    fontSize: 25,
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
});
export default Account;
