import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
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
const Comments = ({ route, navigation }) => {
  const { comments, id, isAccount } = route.params;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.like);
  const [commentValue, setCommentValue] = useState("");
  const [fakecom, setFakecom] = useState(false);

  const commentHandler = () => {
    setFakecom(true);
    dispatch(addCommentOnPost(id, commentValue));
    alert("Comment added");
  };
  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Comments</Text>
        <TextInput
          multiline={true}
          style={styles.input}
          placeholder="Enter your comment"
          onChangeText={(e) => setCommentValue(e)}
        />
        <Button
          style={styles.comment}
          mode="contained"
          color="blue"
          onPress={() => commentHandler()}
        >
          Comment
        </Button>
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
