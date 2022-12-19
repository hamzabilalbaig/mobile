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

const UserProfile = ({ route, navigation }) => {
  const userId = route.params;
  const dispatch = useDispatch();

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
              onPress={() => SetModalFollowers(!modalFollowers)}
              style={styles.userInfoItem}
            >
              <Text style={styles.userInfoTitle}>{user.followers.length}</Text>
              <Text style={styles.userInfoSubTitle}>Followers</Text>
            </Pressable>
            <Pressable
              onPress={() => SetModalFollowing(!modalFollowing)}
              style={styles.userInfoItem}
            >
              <Text style={styles.userInfoTitle}>{user.following.length}</Text>
              <Text style={styles.userInfoSubTitle}>Following</Text>
            </Pressable>
          </View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalFollowers}
            onRequestClose={() => {
              SetModalFollowers(!modalFollowers);
            }}
          >
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
              <View style={[styles.header, { marginBottom: 20 }]}>
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
          {/* <Button
            style={styles.buttons}
            mode="contained"
            color="blue"
            onPress={() => SetModalFollowing(!modalFollowing)}
          >
            Following ({user.following.length})
          </Button> */}
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalFollowing}
            onRequestClose={() => {
              SetModalFollowing(!modalFollowing);
            }}
          >
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
              <View style={[styles.header, { marginBottom: 20 }]}>
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
          <Text style={styles.posts}>Posts ({user.posts.length})</Text>
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
                />
              </>
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
    borderRadius: 360,
  },
  profileName: {
    marginVertical: 8,
    fontWeight: "bold",
    fontSize: 20,
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
});
export default UserProfile;
