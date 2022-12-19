import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/Colors";
import Icons from "react-native-vector-icons/MaterialIcons";

import ReelsComponent from "../Components/ReelsComponent";

const Reels = () => {
  const { height, width, fontScale } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: width,
        height: height,
        backgroundColor: "black",
        position: "relative",
      }}
    >
      <View
        style={{
          paddingTop: 30,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          zIndex: 1,
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20 / fontScale,
            fontWeight: "bold",
            color: "white",
          }}
        >
          Reels
        </Text>
        <Icons name="camera-alt" color="white" size={25} />
      </View>
      <ReelsComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
  },
});
export default Reels;
