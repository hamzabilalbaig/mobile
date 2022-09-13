import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/Colors";
import UserSearch from "../Components/UserSearch";

const Likes = ({ route, navigation }) => {
  const likes = route.params;
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Likes</Text>

        <ScrollView>
          {likes.length === 0 ? (
            <Text>No one has liked this post</Text>
          ) : (
            likes.map((like) => (
              <UserSearch
                key={like._id}
                userId={like._id}
                name={like.name}
                avatar={like.avatar.url}
              />
            ))
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
});
export default Likes;
