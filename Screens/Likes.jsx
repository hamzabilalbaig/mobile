import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/Colors";
import UserSearch from "../Components/UserSearch";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const Likes = ({ route }) => {
  const { likes } = route.params;
  const { fontScale } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
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
            width: 95,
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
            {`Likes  (${likes.length})`}
          </Text>
        </View>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="close"
            size={24}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        style={{ paddingHorizontal: 15, flex: 1 }}
      >
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : "7.5%",
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
