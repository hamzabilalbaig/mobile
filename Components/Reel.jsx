import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { Feather, Ionic, AntDesign, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Video } from "expo-av";
import { useRef } from "react";
import { useState } from "react";

const Reel = ({ item, index, currentIndex }) => {
  const { height, width, fontScale } = useWindowDimensions();

  const videoRef = useRef(null);

  const onBuffer = (buffer) => {
    console.log("buffering", buffer);
  };
  const onError = (error) => {
    console.log("error", error);
  };

  const [mute, setMute] = useState(false);

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
        onPress={() => console.log(item.video)}
        style={{ width: "100%", height: "80%", position: "absolute" }}
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

      <View
        style={{
          position: "absolute",
          bottom: 10, //edited
          right: 0,
        }}
      >
        {/* <TouchableOpacity
          onPress={() => console.log("like")}
          style={{ padding: 10 }}
        >
          <AntDesign name={"heart"} color={"red"} size={25} />
          <Text style={{ color: "white", textAlign: "center" }}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <Ionic name="ios-chatbubble-outline" color="white" size={25} />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <Ionic name="paper-plane-outline" color="white" size={25} />
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
              source={item.postProfile}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
                resizeMode: 'cover',
              }}
            />
        </View> */}
      </View>
    </View>
  );
};

export default Reel;

const styles = StyleSheet.create({});
