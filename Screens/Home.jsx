import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  SafeAreaView,
  Button,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import Icons from "react-native-vector-icons/MaterialIcons";
import { getFollowingPosts, loadUser, logoutUser } from "../redux/Actions/User";
import Post from "../Components/Post";
import Loader from "../Components/Loader";

const Home = () => {
  const { fontScale } = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );

  useEffect(() => {
    dispatch(getFollowingPosts());
    if (!loading) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.other}
            onPress={() => navigation.navigate("UserProfile")}
          >
            {/* <Image
                  source={{ uri: i.owner.avatar.url }}
                  style={{ height: 30, width: 30, borderRadius: 30 / 2 }}
                /> */}
            <Icons name="person-outline" size={30} color="#748c94" />
          </TouchableOpacity>
          <Text style={[styles.dotex, { fontSize: 25 / fontScale }]}>
            DOTE
            <Text
              style={[
                styles.dotex,
                { fontSize: 25 / fontScale, fontStyle: "italic" },
              ]}
            >
              X
            </Text>
          </Text>
          <TouchableOpacity
            style={styles.other}
            onPress={() => navigation.navigate("Search")}
          >
            <Icons name="search" size={30} color="#748c94" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
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
  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  dotex: { color: colors.primary, marginHorizontal: "25%", fontWeight: "bold" },
  other: {
    marginTop: 0,
  },
});
export default Home;
