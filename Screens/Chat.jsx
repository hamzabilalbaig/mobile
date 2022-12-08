import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Image,
  Keyboard,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import { serverURL } from "../constants/Config";

const Chat = () => {
  const navigation = useNavigation();
  const [input, setinput] = useState("");
  const { fontScale } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  const [conversation, setconversation] = useState([]);
  const [newMessage, setnewMessage] = useState([]);

  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  useEffect(() => {
    getConversation();
  }, [input]);

  const scrollViewRef = useRef(null);

  const getConversation = async () => {
    try {
      const res = await axios.get(
        serverURL + "/getMessage/6373d8fc51fd75ca94cc50b1"
      );
      setconversation(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    setinput("");
    const message = {
      sender: user._id,
      text: input,
      conversationId: "6373d8fc51fd75ca94cc50b1",
    };
    try {
      const res = await axios.post(serverURL + "/postMessage", message);
      if (res.status === 200) {
        getConversation();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: top }]}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{ marginRight: 8 }}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 7.5,
              }}
            >
              {/* <Image
              source={require("../../assets/pf.png")}
              style={{
                height: 45,
                width: 45,
                borderRadius: 45 / 2,
              }}
            /> */}
              <View
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 45 / 2,
                  borderColor: "black",
                  borderWidth: 1,
                }}
              />
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 18 / fontScale,
                  color: "black",
                  marginLeft: 7.5,
                }}
              >
                Name
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity style={{ marginRight: 12 }}>
              <MaterialIcons name="call" size={28} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="video-call" size={28} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({ animated: true })
              }
              contentContainerStyle={{ paddingTop: 15 }}
            >
              {conversation.map((chat, index) => {
                return (
                  <>
                    {chat.sender === user._id ? (
                      <>
                        <View style={styles.reciever}>
                          <Text style={styles.recieverText}>{chat.text}</Text>
                        </View>
                        <View style={styles.recieverTime}>
                          <Text>
                            {moment(chat.createdAt).startOf("LTS").fromNow()}
                          </Text>
                        </View>
                      </>
                    ) : (
                      <>
                        <View style={styles.sender}>
                          <Text style={styles.senderText}>{chat.text}</Text>
                        </View>
                        <View style={styles.senderTime}>
                          <Text>
                            {moment(chat.createdAt).startOf("LTS").fromNow()}
                          </Text>
                        </View>
                      </>
                    )}
                  </>
                );
              })}
            </ScrollView>
            <View style={styles.footer}>
              <View style={styles.textInput}>
                <TextInput
                  value={input}
                  onChangeText={(text) => setinput(text)}
                  placeholder="Send Message"
                  style={{
                    width: "85%",
                  }}
                />
              </View>
              <TouchableOpacity onPress={handleSubmit}>
                <Ionicons name="send" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    maxWidth: "80%",
    position: "relative",
  },
  recieverText: {
    color: "black",
    fontWeight: "600",
    // marginLeft: 10,
  },
  recieverTime: {
    padding: 15,
    paddingTop: 5,
    alignSelf: "flex-end",
    marginRight: 7.5,
    marginBottom: 10,
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "blue",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginLeft: 15,
    maxWidth: "80%",
    position: "relative",
    marginBottom: 0,
  },
  senderText: {
    color: "white",
    fontWeight: "600",
    // marginLeft: 10,
  },
  senderTime: {
    padding: 15,
    paddingTop: 5,
    alignSelf: "flex-start",
    marginLeft: 7.5,
    position: "relative",
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
    // flex: 1,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    paddingLeft: 20,
    color: "grey",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: "5%",
    alignItems: "center",
  },
  headerTitle: {
    marginTop: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
  },
  headerButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 10,
    paddingHorizontal: 14,
    height: 55,
    alignItems: "center",
  },
  headerButton: {
    backgroundColor: "white",
    width: "33%",
    padding: 10,
    height: "100%",
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
  },
  headerButtonText: {
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  fill: {
    flex: 1,
    marginHorizontal: 10,
  },
  button: {
    marginHorizontal: 10,
  },
});
export default Chat;
