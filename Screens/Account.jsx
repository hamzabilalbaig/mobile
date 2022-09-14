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
        } else {
          setFollowingCheck(false);
        }
      });
    }
  }, [me, userId, user, userLoading, user.followers, me._id]);

  const followingHandler = () => {
    // setFollowingCheck(!followingCheck);
    // dispatch(followAndUnfollowUser(userId));
    // dispatch(getUserProfile(userId));
    console.log("user Profile/n", user.followers);
  };

  return loading || userLoading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity style={styles.other} onPress={() => sada}>
              <Icons name="delete-forever" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>Profile</Text>
            <TouchableOpacity style={styles.other} onPress={() => asdas}>
              <Icons name="edit" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.profile}>
            <Avatar.Image
              size={200}
              source={{
                uri: user.avatar.url,
              }}
            />
          </View>
          <Text style={styles.profileName}>{user.name}</Text>
          <Button
            style={styles.buttons}
            mode="contained"
            color="blue"
            onPress={() => SetModalFollowers(!modalFollowers)}
          >
            Followers ({user.followers.length})
          </Button>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalFollowers}
            onRequestClose={() => {
              SetModalFollowers(!modalFollowers);
            }}
          >
            <View>
              <View style={styles.header}>
                <Icons
                  onPress={() => {
                    SetModalFollowers(!modalFollowers);
                  }}
                  name="close"
                  size={30}
                  color="red"
                />

                <Text style={styles.title}>Followers</Text>
                <Icons name="close" size={30} color={colors.lightBackground} />
              </View>
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
                <Text style={{ margin: "2vmax" }}>
                  There Are No Followers yet.
                </Text>
              )}
            </View>
          </Modal>
          <Button
            style={styles.buttons}
            mode="contained"
            color="blue"
            onPress={() => SetModalFollowing(!modalFollowing)}
          >
            Following ({user.following.length})
          </Button>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalFollowing}
            onRequestClose={() => {
              SetModalFollowing(!modalFollowing);
            }}
          >
            <View>
              <View style={styles.header}>
                <Icons
                  onPress={() => {
                    SetModalFollowing(!modalFollowing);
                  }}
                  name="close"
                  size={30}
                  color="red"
                />

                <Text style={styles.title}>Following</Text>
                <Icons name="close" size={30} color={colors.lightBackground} />
              </View>
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
                <Text style={{ margin: "2vmax" }}>
                  You're not following anyone
                </Text>
              )}
            </View>
          </Modal>
          <Button
            style={styles.buttons}
            mode="contained"
            color={followingCheck ? "tomato" : "green"}
            onPress={() => followingHandler()}
          >
            {followingCheck ? "UnFollow" : "Follow"}
          </Button>
          <Text style={styles.posts}>Posts ({user.posts.length})</Text>
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
});
export default Account;
