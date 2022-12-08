import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
  FlatList,
  Image,
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

const ConverstionList = ({ list, currentUser }) => {
  const { fontScale } = useWindowDimensions();

  const navigation = useNavigation();

  const friendID = list.members.find((i) => i !== currentUser);
  const [sender, setsender] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile(friendID));
  }, []);

  const { user } = useSelector((state) => state.userProfile);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Chat", { id: user._id })}
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
          source={{ uri: user?.avatar.url }}
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
          {user.name}
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

  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  useEffect(() => {
    axios.get(serverURL + `/getConversation/${user._id}`).then((res) => {
      let conversation = res.data;
      setconversation(conversation);
      console.log(conversation);
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

  const rendeR = ({ item }) => <RenderList item={item} />;

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingTop: "14%" }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <MaterialIcons name="person" size={24} color="black" />

        <Text
          style={{
            fontSize: 20 / fontScale,
            fontWeight: "700",
            color: colors.textPrimary,
          }}
        >
          Chats
        </Text>

        <MaterialIcons name="add" size={24} color="black" />
      </View>

      {/* Search */}
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
      </View>

      {/* List */}

      {conversation.map((item, index) => {
        return <ConverstionList list={item} currentUser={user._id} />;
      })}
      {/* <FlatList
        data={conversation}
        keyExtractor={keyEx}
        ListEmptyComponent={listEmpty}
        contentContainerStyle={{ paddingBottom: 10 }}
        renderItem={rendeR}
      /> */}
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
    paddingTop: 20,
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
