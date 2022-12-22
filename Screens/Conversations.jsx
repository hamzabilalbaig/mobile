import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
  FlatList,
  Image,
  Keyboard,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../constants/Colors";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverURL } from "../constants/Config";
import { useEffect } from "react";
import { getUserProfile } from "../redux/Actions/User";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import io from "socket.io-client";
import { ActivityIndicator } from "react-native-paper";

const ConverstionList = ({ list, currentUser }) => {
  const { fontScale } = useWindowDimensions();

  const navigation = useNavigation();

  const [sender, setsender] = useState("");

  const dispatch = useDispatch();
  const [recid, setrecid] = useState("");

  const [user2, setuser2] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user: me } = useSelector((state) => state.user);

  useEffect(async () => {
    const friendID = list.members.find((i) => i !== currentUser);
    setrecid(friendID);
    dispatch(getUserProfile(friendID));

    const CreateCon = () => {
      console.log(friendID, "frnd");
      axios
        .get(`${serverURL}/user/${friendID}`)
        .then((res) => {
          setuser2(res.data.user);
          console.log(user2?.avatar.url);
        })
        .catch((e) => {
          console.log(`con error ${e}`);
        });
    };
    await CreateCon();
  }, []);

  const { user, loading } = useSelector((state) => state.userProfile);

  // const socket = useRef();

  // useEffect(() => {
  //   socket.current = io("ws://192.168.100.241:3000");
  // }, []);
  // useEffect(() => {
  //   socket.current.emit("addUser", me._id);
  //   socket.current.on("getUsers", (users) => {});
  // }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Chat", {
          id: list._id,
          friendID: recid,
          avatar: user2?.avatar?.url,
          name: user2?.name,
        });
      }}
      // onPress={() => console.log(user)}
      style={{
        flexDirection: "row",
        paddingHorizontal: 20,
        marginTop: 20,
        borderWidthTop: 1,
        borderWidthBottom: 1,
        borderColor: "grey",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: 60,
          width: 60,
          justifyContent: "center",
        }}
      >
        <Image
          source={{ uri: user2?.avatar?.url }}
          style={{ height: 60, width: 60, borderRadius: 30 }}
        />
      </View>

      <View style={{ paddingLeft: 15 }}>
        <Text
          style={{
            fontSize: 20 / fontScale,
            fontWeight: "600",
            color: colors.textPrimary,
          }}
        >
          {user2?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Conversations = () => {
  const { fontScale } = useWindowDimensions();

  const [searchFocus, setsearchFocus] = useState(false);
  const [searchInput, setsearchInput] = useState("");

  const [conversation, setconversation] = useState([]);
  const [chatLoading, setchatLoading] = useState(false);

  const navigation = useNavigation();

  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  useEffect(() => {
    setchatLoading(true);
    axios
      .get(serverURL + `/getConversation/${user?._id}`)
      .then((res) => {
        let conversation = res.data;
        setconversation(conversation);
        console.log(conversation);
        setchatLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setchatLoading(false);
      });
  }, []);

  const keyEx = (item) => {
    item.id;
  };

  const listEmpty = () => {
    return (
      <>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No items found</Text>
        </View>
      </>
    );
  };

  const rendeR = ({ item }) => <ConverstionList item={item} />;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop:
          Platform.OS === "android" ? StatusBar.currentHeight : "7.5%",
      }}
    >
      <ActivityIndicator
        animating={chatLoading}
        style={{ position: "absolute", right: 0, left: 0, bottom: 0, top: 0 }}
      />
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          paddingBottom: 15,
        }}
      >
        <Text
          style={{ fontSize: 28 / fontScale, fontWeight: "600", color: "grey" }}
        >
          Chat
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="close"
            size={30}
            color="black"
            style={{ opacity: 0.4 }}
          />
        </TouchableOpacity>
      </View>

      {/* Search */}
      {/* <View style={styles.searchContainer}>
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
            placeholder="Search"
            value={searchInput}
            onChangeText={(text) => setsearchInput(text)}
            style={{ paddingLeft: 8, width: "80%" }}
          />
        </View>
        <TouchableOpacity
          onPress={() => console.log(user._id)}
          style={styles.searchButton}
        >
          <Ionicons name="search-outline" size={24} color={"white"} />
        </TouchableOpacity>
      </View> */}
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20.5,
        }}
      >
        <View
          style={{
            width: searchFocus ? "85%" : "100%",
            height: 40,
            backgroundColor: "#d2d2d2",
            borderRadius: 12,
            borderWidth: 0,
            flexDirection: "row",
            //   justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
            // borderColor: searchFocus ? colors.primary : "grey",
            // borderWidth: searchFocus ? 2 : 1,
          }}
        >
          <Ionicons name="search" size={24} color={"grey"} />
          <TextInput
            underlineColorAndroid="transparent"
            onFocus={() => setsearchFocus(true)}
            placeholder="Search"
            value={searchInput}
            onChangeText={(text) => {
              setsearchInput(text);
            }}
            style={{ paddingLeft: 8, width: "80%" }}
          />
        </View>
        {searchFocus && (
          <TouchableOpacity
            onPress={() => {
              setsearchFocus(false);
              Keyboard.dismiss();
            }}
            style={{
              width: "15%",
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 5,
            }}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* List */}

      {/* {conversation.map((item, index) => {
        return <ConverstionList list={item} currentUser={user._id} />;
      })} */}
      <FlatList
        data={conversation}
        keyExtractor={keyEx}
        ListEmptyComponent={!chatLoading && listEmpty}
        contentContainerStyle={{ paddingBottom: 10 }}
        renderItem={({ item }) => (
          <ConverstionList list={item} currentUser={user._id} />
        )}
      />
    </View>
  );
};

export default Conversations;

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 20.5,
    marginBottom: 20,
    paddingTop: 10,
  },
  searchInputStyles: {
    width: "85%",
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
