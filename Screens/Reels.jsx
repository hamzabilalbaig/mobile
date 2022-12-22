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
import { useDispatch, useSelector } from "react-redux";
import { getReel } from "../redux/Actions/Post";
import { useEffect } from "react";
import { useState } from "react";
import { ActivityIndicator } from "react-native-paper";

const Reels = () => {
  const { height, width, fontScale } = useWindowDimensions();
  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReel());
  }, []);

  const { reels, loading, error } = useSelector((state) => state.reel);

  const [data, setdata] = useState([]);

  useEffect(() => {
    // reels.map((i) => setdata([...data, i.video]));
    console.log("reels", reels);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        position: "relative",
      }}
    >
      <ActivityIndicator
        animating={loading}
        style={{ position: "absolute", right: 0, left: 0, bottom: 0, top: 0 }}
      />

      <ReelsComponent data={reels} />
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
