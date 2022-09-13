import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Button } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/Colors";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginUser } from "../redux/Actions/User";

const SignIn = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    dispatch(loginUser(email, password));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Welcome to Dotex</Text>
        <TextInput
          style={styles.input}
          onChangeText={(e) => setEmail(e)}
          placeholder="Email"
        ></TextInput>
        <TextInput
          style={styles.input}
          onChangeText={(e) => setPassword(e)}
          placeholder="Password"
          secureTextEntry
        ></TextInput>
        <Text style={styles.textButton}>Forgot Password</Text>
        <Button mode="contained" color="blue" onPress={() => loginHandler()}>
          Log In
        </Button>

        <Text
          style={styles.textButton}
          onPress={() =>
            navigation.navigate("Signup", {
              image:
                "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
            })
          }
        >
          New User?
        </Text>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
  },
  input: {
    backgroundColor: colors.input,
    borderRadius: 45,
    elevation: 10,
    height: 40,
    width: 300,
    textAlign: "center",
    margin: "2%",
    marginVertical: "4%",
    color: "blue",
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    marginVertical: 50,
    color: "blue",
  },
  textButton: {
    textAlign: "center",
    margin: "4%",
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default SignIn;
