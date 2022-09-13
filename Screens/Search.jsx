import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../constants/Colors";
import UserSearch from "../Components/UserSearch";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/Actions/User";
import { Button } from "react-native-paper";

const Search = () => {
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const { users, loading } = useSelector((state) => state.allUsers);

  const nameHandler = () => {
    dispatch(getAllUsers(name));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          placeholder="name"
          onChangeText={(e) => setname(e)}
        />

        <Button
          style={styles.search}
          mode="contained"
          color="blue"
          onPress={() => nameHandler()}
        >
          Search
        </Button>

        <ScrollView>
          {users && users.length > 0 ? (
            users.map((user) => (
              <UserSearch
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))
          ) : (
            <Text>No User</Text>
          )}
        </ScrollView>
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
