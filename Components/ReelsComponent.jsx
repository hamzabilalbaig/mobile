import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import Reel from "./Reel";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const videos = [
  {
    video: {
      uri: "https://res.cloudinary.com/dyrnsddc1/video/upload/v1671637829/reels/jvh7grt83laqvapv0cu8.mov",
    },
  },
  {
    video: require("../assets/video1.mp4"),
  },
  {
    uri: "https://res.cloudinary.com/dyrnsddc1/video/upload/v1671637829/reels/jvh7grt83laqvapv0cu8.mov",
  },
];

const ReelsComponent = ({ data }) => {
  const [currentIndex, setcurrentIndex] = useState(0);
  const handleChangeIndexValue = ({ index }) => {
    setcurrentIndex(index);
  };

  // const { reels, loading, error } = useSelector((state) => state.reel);

  return (
    <SwiperFlatList
      vertical={true}
      onChangeIndex={handleChangeIndexValue}
      data={data}
      renderAll={false}
      renderItem={({ item, index }) => (
        <Reel item={item} index={index} currentIndex={currentIndex} />
      )}
      keyExtractor={(item, index) => index}
    />
  );
};

export default ReelsComponent;

const styles = StyleSheet.create({});
