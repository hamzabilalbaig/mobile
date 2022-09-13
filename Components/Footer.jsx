import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import Icons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.Footer}>
      <TouchableOpacity
        style={styles.other}
        onPress={() => navigation.navigate("home")}
      >
        <Icons name="dynamic-feed" size={30} color="blue" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.other}
        onPress={() => navigation.navigate("Chat")}
      >
        <Icons name="chat-bubble-outline" size={30} color="blue" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.add}
        onPress={() =>
          navigation.navigate("CreatePost", {
            image:
              "https://static.vecteezy.com/system/resources/previews/004/638/341/original/3d-style-camera-icon-blue-color-vector.jpg",
          })
        }
      >
        <Icons name="add" size={40} color="blue" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.other}
        onPress={() => navigation.navigate("Reels")}
      >
        <Icons name="video-collection" size={30} color="blue" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.other}
        onPress={() => navigation.navigate("Rooms")}
      >
        <Icons name="meeting-room" size={30} color="blue" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Footer: {
    padding: 30,
    backgroundColor: "white",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  add: {
    borderWidth: 2,
    borderRadius: 360,
    borderColor: "blue",

    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  other: {
    marginTop: 30,
  },
});

export default Footer;
