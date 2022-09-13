import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/Colors";
import Header from "../Components/Header";
import { Avatar, Button } from "react-native-paper";
import { useState } from "react";
import * as FileSystem from "expo-file-system";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/Actions/User";

const Signup = ({ navigation, route }) => {
  const { image } = route.params;

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    }).then((i) => setAvatar(`data:image/png;base64,${i}`));
  }, [FileSystem, image]);

  const SignUpHandler = async () => {
    await dispatch(registerUser(name, email, password, avatar));
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView>
        <Text style={styles.title}>Sign Up</Text>

        <TouchableHighlight
          style={styles.imageCon}
          onPress={() => {
            navigation.navigate("CameraComponent2");
          }}
        >
          <View style={styles.profile}>
            <Avatar.Image
              style={{ backgroundColor: "blue" }}
              size={200}
              source={{
                uri: image,
              }}
            />
          </View>
        </TouchableHighlight>
        <TextInput
          style={styles.input}
          onChangeText={(e) => setName(e)}
          placeholder="Name"
        ></TextInput>
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

        <Button
          style={styles.signup}
          mode="contained"
          color="blue"
          onPress={() => SignUpHandler()}
        >
          Sign Up
        </Button>
        <Text
          style={styles.textButton}
          onPress={() => navigation.navigate("Sign In")}
        >
          Already a User?
        </Text>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
  profile: {
    marginTop: "4%",
    marginBottom: "4%",
    alignSelf: "center",
    elevation: 20,
    backgroundColor: "green",
    borderRadius: 360,
  },
  textButton: {
    textAlign: "center",
    margin: "4%",
    color: "blue",
    textDecorationLine: "underline",
  },
  signup: {
    borderRadius: 45,
    elevation: 10,
    height: 40,
    width: 300,
    textAlign: "center",
    marginBottom: "4%",
    textAlign: "center",
    margin: "2%",
    marginVertical: "4%",
    color: "blue",
  },
  image: {
    width: 335,
    height: 200,
    margin: "3%",
    borderRadius: 360,
  },
  imageCon: {
    borderRadius: 30,
    elevation: 50,
    borderRadius: 360,
  },
});
export default Signup;
