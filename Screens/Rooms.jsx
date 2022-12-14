import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/Colors";
import { useRef } from "react";
import { useEffect } from "react";
import io from "socket.io-client";

const Rooms = () => {
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://192.168.100.241:8001");
    socket.current.emit("join-room", { roomId: "1", emailId: "any@rmaa.com" });
  }, []);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text onPress={() => console.log("Rooms")}>Enter Room Code</Text>
        <TextInput placeholder="3213214" />
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
});
export default Rooms;
