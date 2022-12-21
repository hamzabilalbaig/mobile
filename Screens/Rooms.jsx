import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  SafeAreaView,
  TextInput,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/Colors";
import { useRef } from "react";
import { useEffect } from "react";
import io from "socket.io-client";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const Rooms = () => {
  const { fontScale } = useWindowDimensions();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://192.168.100.241:8001");
    socket.current.emit("join-room", { roomId: "1", emailId: "any@rmaa.com" });
  }, []);

  const [searchFocus, setsearchFocus] = useState(false);
  const [searchInput, setsearchInput] = useState("");
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{ fontSize: 28 / fontScale, fontWeight: "600", color: "grey" }}
        >
          Join the talk!
        </Text>

        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchInputStyles,
              {
                borderColor: searchFocus ? colors.primary : "grey",
                borderWidth: searchFocus ? 2 : 0.5,
              },
            ]}
          >
            <TextInput
              underlineColorAndroid="transparent"
              onFocus={() => setsearchFocus(true)}
              placeholder="Enter meeting id"
              value={searchInput}
              onChangeText={(text) => setsearchInput(text)}
              style={{ width: "100%" }}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 35,
        }}
      >
        <TouchableOpacity
          style={{
            height: 45,
            backgroundColor: colors.primary,
            borderRadius: 12,
            width: "70%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 14 / fontScale, color: "white" }}>
            Enter Meeting
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  searchContainer: {
    width: "70%",
    flexDirection: "row",
    // paddingHorizontal: 20.5,
    marginBottom: 20,
    paddingVertical: 20,
  },
  searchInputStyles: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  searchButton: {
    width: "15%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    borderRadius: 10,
    marginLeft: 5,
  },
});
export default Rooms;
