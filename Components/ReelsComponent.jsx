import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import Reel from "./Reel";
import { useState } from "react";

const videos = [
  {
    video: require("../assets/video3.mp4"),
  },
  {
    video: require("../assets/video1.mp4"),
  },
  {
    video: require("../assets/video4.mp4"),
  },
];

const ReelsComponent = () => {
  const [currentIndex, setcurrentIndex] = useState(0);
  const handleChangeIndexValue = ({ index }) => {
    setcurrentIndex(index);
  };

  return (
    <SwiperFlatList
      vertical={true}
      onChangeIndex={handleChangeIndexValue}
      data={videos}
      renderItem={({ item, index }) => (
        <Reel item={item} index={index} currentIndex={currentIndex} />
      )}
      keyExtractor={(item, index) => index}
    />
  );
};

export default ReelsComponent;

const styles = StyleSheet.create({});
