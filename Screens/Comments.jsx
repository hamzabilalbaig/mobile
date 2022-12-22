import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  useWindowDimensions,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/Colors";
import UserSearch from "../Components/UserSearch";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { addCommentOnPost } from "../redux/Actions/Post";
import Loader from "../Components/Loader";
import CommentCard from "../Components/CommentCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getFollowingPosts } from "../redux/Actions/User";

const Comments = ({ route }) => {
  const { comments, id, isAccount } = route.params;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.like);
  const [commentValue, setCommentValue] = useState("");
  const [fakecom, setFakecom] = useState(false);
  const navigation = useNavigation();
  const { fontScale } = useWindowDimensions();

  const commentHandler = () => {
    setFakecom(true);
    dispatch(addCommentOnPost(id, commentValue));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 5,
            borderBottomWidth: 0.5,
            borderBottomColor: "#9b9b9b",
            marginBottom: 15,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: "40%",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderBottomColor: colors.primary,
              borderBottomWidth: 1.5,
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                color: colors.primary,
                fontSize: 18 / fontScale,
              }}
            >
              {`Comments  (${comments.length})`}
            </Text>
          </View>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={() => {
              navigation.goBack();
              dispatch(getFollowingPosts());
            }}
          >
            <MaterialCommunityIcons
              name="close"
              size={24}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: null,
            backgroundColor: colors.input,
            marginHorizontal: 20,
            borderRadius: 12,
            marginBottom: 20,
            flexDirection: "row",
          }}
        >
          <TextInput
            multiline={true}
            placeholder="Enter your Comment"
            onChangeText={(e) => setCommentValue(e)}
            value={commentValue}
            onBlur={() => Keyboard.dismiss()}
            style={{ marginHorizontal: 18, marginVertical: 15, width: "80%" }}
          />
          {commentValue !== "" && (
            <TouchableOpacity
              onPress={() => commentHandler()}
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
                marginVertical: 15,
              }}
            >
              <MaterialCommunityIcons
                name="send"
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* <Button
          style={styles.comment}
          mode="contained"
          color="blue"
          onPress={() => commentHandler()}
        >
          Comment
        </Button> */}
        <ScrollView>
          {fakecom === true ? (
            <CommentCard
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
              comment={commentValue === "" ? "no comment" : commentValue}
              commentId={"sadas"}
              postId={"asdas"}
              isAccount={isAccount}
            />
          ) : (
            <View></View>
          )}
          {comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                key={item._id}
                userId={item.user._id}
                name={item.user.name}
                avatar={item.user.avatar.url}
                comment={item.comment}
                commentId={item._id}
                postId={id}
              />
            ))
          ) : (
            <View></View>
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
  title: {
    alignSelf: "center",
    fontSize: 25,
    color: "blue",
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginTop: "2%",
  },
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

export default Comments;
