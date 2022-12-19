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
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/Colors";
import Header from "../Components/Header";
import { Avatar, Button, Surface } from "react-native-paper";
import { useState } from "react";
import * as FileSystem from "expo-file-system";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/Actions/User";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

const Signup = ({ navigation, route }) => {
  const { fontScale } = useWindowDimensions();
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

  const [secure, setsecure] = useState(false);
  return (
    <View style={styles.container}>
      <View style={{ height: "20%" }}>
        <Image
          source={require("../assets/logo.png")}
          style={{ height: "95%", width: "100%", resizeMode: "contain" }}
        />
      </View>

      <TouchableHighlight
        style={styles.imageCon}
        onPress={() => {
          navigation.navigate("CameraComponent2");
        }}
      >
        <View style={styles.profile}>
          <Avatar.Image
            style={{ backgroundColor: "blue" }}
            size={100}
            source={{
              uri: image,
            }}
          />
        </View>
      </TouchableHighlight>
      <Text
        style={{
          color: "#515151",
          fontSize: 14 / fontScale,
          fontWeight: "400",
          paddingBottom: 15,
          textAlign: "center",
        }}
      >
        Add your profile picture
      </Text>
      <Text
        style={{
          color: "#515151",
          fontSize: 18 / fontScale,
          fontWeight: "600",
          paddingVertical: 10,
        }}
      >
        Create your account
      </Text>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.container, { paddingHorizontal: 0 }]}
      > */}
      <Surface style={styles.input}>
        <TextInput onChangeText={(e) => setName(e)} placeholder="Name" />
      </Surface>
      <Surface style={styles.input}>
        <TextInput
          onChangeText={(e) => setEmail(e)}
          keyboardType="email-address"
          placeholder="Email"
        />
      </Surface>
      <Surface
        style={[
          styles.input,
          { flexDirection: "row", justifyContent: "space-between" },
        ]}
      >
        <TextInput
          onChangeText={(e) => setPassword(e)}
          placeholder="Password"
          secureTextEntry={!secure}
          style={{ width: "90%" }}
        />
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={() => setsecure(!secure)}
        >
          <Icons
            name={!secure ? "eye-off-outline" : "eye-outline"}
            color="grey"
            size={25}
          />
        </TouchableOpacity>
      </Surface>
      {/* </KeyboardAvoidingView> */}

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          marginBottom: "7.5%",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => SignUpHandler()}
          style={{
            height: 60,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0081C6",
            borderRadius: 8,
            opacity: 0.7,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18 / fontScale,
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        {/* <Button
        style={styles.signup}
        mode="contained"
        color="blue"
        onPress={() => SignUpHandler()}
      >
        Sign Up
      </Button> */}
        {/* <Text
        style={styles.textButton}
        onPress={() => navigation.navigate("Sign In")}
      >
        Already a User?
      </Text> */}
        <Text style={{ color: "grey", paddingTop: "5%" }}>
          Already have an account?{"  "}
          <Text
            style={styles.textButton}
            onPress={() => navigation.navigate("Sign In")}
          >
            Log in
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 30,
  },
  input: {
    // backgroundColor: colors.input,
    borderRadius: 12,
    elevation: 1,
    height: 50,
    // width: 300,
    textAlign: "center",
    // margin: "2%",
    marginVertical: "4%",
    color: "blue",
    justifyContent: "center",
    paddingHorizontal: 15,
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
    color: "#0081C6",
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
    elevation: 5,
    borderRadius: 360,
  },
});
export default Signup;
