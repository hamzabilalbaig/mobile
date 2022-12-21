import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../constants/Colors";
import UserSearch from "../Components/UserSearch";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/Actions/User";
import Icons from "react-native-vector-icons/MaterialIcons";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const Search = () => {
  const dispatch = useDispatch();
  const [searchInput, setsearchInput] = useState("");
  const { users, loading } = useSelector((state) => state.allUsers);

  const nameHandler = () => {
    dispatch(getAllUsers(searchInput));
  };

  const [searchFocus, setsearchFocus] = useState(false);

  const handleFocus = () => {
    setsearchFocus(true);
  };

  return (
    <View style={styles.container}>
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
            onFocus={handleFocus}
            placeholder="Search"
            value={searchInput}
            onChangeText={(text) => {
              setsearchInput(text);
              dispatch(getAllUsers(text));
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
      <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
        {users && users.length > 0
          ? users.map((user, index) => (
              <UserSearch
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
                index={index}
              />
            ))
          : !loading && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 20.5,
                  marginTop: 150,
                }}
              >
                <Icons name="search" size={50} color={"#000"} />
                <View
                  style={{
                    paddingVertical: 10,
                    width: "75%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                      color: colors.textPrimary,
                      paddingBottom: 8,
                      textAlign: "center",
                    }}
                  >
                    No results found!
                  </Text>
                  <Text
                    style={{
                      fontWeight: "400",
                      fontSize: 16,
                      color: colors.textSecondary,
                      textAlign: "center",
                    }}
                  >
                    Sorry, there're no results for this search, please try
                    another phrase
                  </Text>
                </View>
              </View>
            )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
    paddingTop:
      Platform.OS === "android" ? StatusBar.currentHeight + 20 : "10%",
  },
  input: {
    backgroundColor: colors.input,
    borderRadius: 45,
    elevation: 10,
    height: 40,
    width: 320,
    textAlign: "center",
    marginLeft: "5%",
    marginRight: "1%",
    marginBottom: "4%",
    color: "blue",
  },
  search: {
    borderRadius: 45,
    elevation: 10,
    height: 40,
    width: 320,
    textAlign: "center",
    marginLeft: "5%",
    marginRight: "1%",
    marginBottom: "4%",
    color: "blue",
  },
});
export default Search;
