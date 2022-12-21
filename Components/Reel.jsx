import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import React from "react";
import { Video } from "expo-av";
import { useRef } from "react";
import { useState } from "react";

import Icons from "react-native-vector-icons/AntDesign";

import Icons3 from "react-native-vector-icons/Feather";

import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Reel = ({ item, index, currentIndex }) => {
  const { height, width, fontScale } = useWindowDimensions();

  const navigation = useNavigation();
  const videoRef = useRef(null);

  const onBuffer = (buffer) => {
    console.log("buffering", buffer);
  };
  const onError = (error) => {
    console.log("error", error);
  };

  const [mute, setMute] = useState(false);

  const { user } = useSelector((state) => state.user);

  return (
    <View
      style={{
        width: width,
        height: height,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setMute(!mute)}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      >
        <Video
          ref={videoRef}
          onBuffer={onBuffer}
          onError={onError}
          shouldPlay={true}
          // useNativeControls
          isLooping
          resizeMode="cover"
          source={item.video}
          isMuted={mute}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ position: "absolute", top: "4%", left: "4%" }}
        onPress={() => navigation.goBack(null)}
      >
        <MaterialIcons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>
      <View
        style={{
          position: "absolute",
          bottom: 0, //edited
          right: 0,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => console.log("like")}
          style={{ padding: 5 }}
        >
          <AntDesign name={"heart"} color={"red"} size={25} />
          <Text style={{ color: "white", textAlign: "center" }}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <Ionicons name="ios-chatbubble-outline" color="white" size={25} />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <Ionicons name="paper-plane-outline" color="white" size={25} />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <Feather name="more-vertical" color="white" size={25} />
        </TouchableOpacity>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "white",
            margin: 10,
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
              resizeMode: "cover",
            }}
            source={{ uri: user?.avatar.url }}
          />
        </View>
      </View>
    </View>
  );
};

export default Reel;

const styles = StyleSheet.create({});
