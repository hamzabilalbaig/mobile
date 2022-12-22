import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  Modal,
  useWindowDimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/Colors";
import { useRef } from "react";
import { useEffect } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { useState } from "react";
import Icons from "react-native-vector-icons/MaterialIcons";
import { useMemo } from "react";
import { useCallback } from "react";
// import {
//   RTCPeerConnection,
//   MediaStream,
//   mediaDevices,
// } from "react-native-webrtc";

const Rooms = () => {
  const socket = useRef();
  const peer = useRef();
  const { fontScale } = useWindowDimensions();
  const navigation = useNavigation();
  const [input, setinput] = useState("");
  const [chat, setchat] = useState([]);
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);
  const [roomId, setRoomId] = useState(null);
  const [modal, setModal] = useState(false);
  const [msg, setmsg] = useState("");
  const [localStream, setLocalStream] = useState(null);
  const [ArrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    socket.current = io("ws://192.168.0.103:8001");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        name: data.name,
        avatar: data.avatar,
        text: data.text,
      });
    });
  }, []);

  const endMeeting = () => {
    setModal(false);
    socket.current.emit("disconnectUser", {
      name: user.name,
    });
  };
  const sendM = () => {
    Keyboard.dismiss();
    socket.current.emit("sendMessage", {
      name: user.name,
      avatar: user.avatar.url,
      text: msg,
    });
  };

  useEffect(() => {
    setchat([...chat, ArrivalMessage]);
  }, [ArrivalMessage]);

  const handleRoomJoined = ({ roomId }) => {
    setModal(!modal);
  };

  const handleJoinRoom = () => {
    socket.current.emit("join-room", {
      roomId: roomId,
      emailId: user.email,
      name: user.name,
    });
  };

  useEffect(() => {
    socket.current.on("joined-room", handleRoomJoined);
  }, [socket]);

  // const createOffer = async () => {
  //   const offer = await peer.createOffer();
  //   await peer.setLocalDescription(offer);
  //   return offer;
  // };

  const handleNewUserJoined = useCallback(
    async (data) => {
      const { emailId } = data;
      console.log("New user joined room", emailId);
      // const offer = await createOffer();
      socket.current.emit("call-user", { emailId, offer });
    },
    [socket]
  );

  // const handleIncommingCall = useCallback((data) => {
  //   const { from, offer } = data;
  //   console.log("incomming call from", from, offer);
  // }, []);

  useEffect(() => {
    socket.current.on("user-joined", handleNewUserJoined);
    // socket.current.on("incomming-call", handleIncommingCall);
  }, [modal]);

  useEffect(() => {
    console.log("Arrival message", ArrivalMessage);
  }, [ArrivalMessage]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            console.log(chat);
          }}
        >
          <Text
            style={{
              fontSize: 28 / fontScale,
              fontWeight: "600",
              color: "grey",
            }}
          >
            Join the talk!
          </Text>
        </TouchableWithoutFeedback>

        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchInputStyles,
              {
                borderColor: colors.primary,
                borderWidth: 2,
              },
            ]}
          >
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Enter meeting id"
              value={roomId}
              keyboardType="number-pad"
              onChangeText={(text) => setRoomId(text)}
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
          onPress={() => handleJoinRoom()}
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

      <Modal
        animationType="slide"
        transparent={false}
        visible={modal}
        onRequestClose={() => {
          setModal(!modal);
        }}
      >
        <View style={{ flex: 1, marginTop: "7.5%", marginHorizontal: 30 }}>
          <View
            style={[
              styles.searchInputStyles,
              {
                borderColor: colors.primary,
                borderWidth: 2,
              },
            ]}
          >
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Enter message"
              value={msg}
              keyboardType="number-pad"
              onChangeText={(text) => setmsg(text)}
              style={{ width: "60%" }}
            />
            <TouchableOpacity
              onPress={sendM}
              style={{
                height: 45,
                backgroundColor: "red",
                borderRadius: 12,
                width: "70%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 14 / fontScale, color: "white" }}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: 35,
            }}
          >
            <TouchableOpacity
              onPress={endMeeting}
              style={{
                height: 45,
                backgroundColor: "red",
                borderRadius: 12,
                width: "70%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 14 / fontScale, color: "white" }}>
                Send
              </Text>
            </TouchableOpacity>
          </View> */}

          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: 35,
            }}
          >
            <TouchableOpacity
              onPress={endMeeting}
              style={{
                height: 45,
                backgroundColor: "red",
                borderRadius: 12,
                width: "70%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 14 / fontScale, color: "white" }}>
                End Meeting
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

// import { StyleSheet, Text, View } from "react-native";
// import React from "react";

// const Rooms = () => {
//   return (
//     <View>
//       <Text>Rooms</Text>
//     </View>
//   );
// };

// export default Rooms;

// const styles = StyleSheet.create({});
