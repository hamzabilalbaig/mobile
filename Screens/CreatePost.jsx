import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/Colors";
import { useState } from "react";
import Header from "../Components/Header";
import { Avatar, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost, createNewReel } from "../redux/Actions/Post";
import * as FileSystem from "expo-file-system";
import { useEffect } from "react";
import Loader from "../Components/Loader";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Mcons from "react-native-vector-icons/MaterialIcons";
import FIcons from "react-native-vector-icons/FontAwesome";
import EIcons from "react-native-vector-icons/Entypo";
import { MaterialIcons } from "@expo/vector-icons";

const CreatePost = ({ navigation, route }) => {
  const { fontScale } = useWindowDimensions();
  const [captionValue, setCaptionValue] = useState("No Caption");
  const [imageValue, setImageValue] = useState(null);

  const dispatch = useDispatch();
  const { loading, message } = useSelector((state) => state.like);

  const postHandler = async () => {
    if (imageValue) {
      await dispatch(createNewReel(captionValue, imageValue));
      alert("Post Created");
      navigation.navigate("home");
      console.log(imageValue, "setting image value");
    } else {
      await dispatch(createNewReel(captionValue, route?.params?.image));
      alert("Post Created");
      navigation.navigate("home");
    }
    setcamera(false);
  };

  useEffect(() => {
    FileSystem.readAsStringAsync(route?.params?.image, {
      encoding: "base64",
    }).then((i) => setImageValue(`data:video/mpeg;base64,${i}`));
  }, [FileSystem, route?.params?.image]);

  const { user } = useSelector((state) => state.user);

  const [camera, setcamera] = useState(false);

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          borderBottomWidth: 0.25,
          borderBottomColor: "grey",
          paddingBottom: 15,
        }}
      >
        <Text
          style={{ fontSize: 28 / fontScale, fontWeight: "600", color: "grey" }}
        >
          Create Post
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons
            name="close"
            size={30}
            color="black"
            style={{ opacity: 0.4 }}
          />
        </TouchableOpacity>
      </View>
      {/* <TouchableHighlight
        style={styles.imageCon}
        onPress={() => {
          navigation.navigate("CameraComponent");
        }}
      >
        <Image
          style={styles.image}
          source={{
            uri:
              route?.params?.image === undefined
                ? "https://static.vecteezy.com/system/resources/previews/004/638/341/original/3d-style-camera-icon-blue-color-vector.jpg"
                : route?.params?.image,
          }}
        />
      </TouchableHighlight> */}
      {/* Post */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <TouchableWithoutFeedback>
          <>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 20,
                paddingVertical: "7%",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: user?.avatar.url,
                }}
                style={{ height: 60, width: 60, borderRadius: 30 }}
              />

              <Text
                style={{
                  justifyContent: "center",
                  paddingLeft: 15,
                  fontSize: 18 / fontScale,
                  fontWeight: "700",
                }}
              >
                {user?.name}
              </Text>
            </View>

            <View
              style={{
                flex: camera ? 0.85 : 0.5,
                backgroundColor: colors.input,
                borderRadius: 15,
                elevation: 5,
                marginHorizontal: 20,
                paddingVertical: 0,
              }}
            >
              <TextInput
                multiline={true}
                placeholder="Enter your Caption"
                onChangeText={(e) => setCaptionValue(e)}
                onBlur={() => Keyboard.dismiss()}
                style={{ marginHorizontal: 18, marginTop: 15 }}
              />
              {camera && (
                <View
                  style={{
                    flex: 1,
                    borderWidth: 0.5,

                    borderRadius: 12,
                    marginHorizontal: 15,
                    marginVertical: 15,
                    padding: 5,
                  }}
                >
                  {route?.params?.image === undefined ? (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("CameraComponent");
                      }}
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#9A9A9A",
                        borderRadius: 8,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => setcamera(false)}
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          height: 30,
                          width: 30,
                          borderRadius: 15,
                          backgroundColor: "#A9A9A9",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <MaterialIcons name="close" size={20} color="white" />
                      </TouchableOpacity>
                      <View
                        style={{
                          height: 50,
                          width: 50,
                          borderRadius: 25,
                          backgroundColor: "#A9A9A9",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: 20,
                        }}
                      >
                        <MaterialIcons
                          name="add-to-photos"
                          size={30}
                          color="white"
                          style={{ opacity: 0.85 }}
                        />
                      </View>
                      <Text
                        style={{
                          fontSize: 16 / fontScale,
                          color: "white",
                          opacity: 0.85,
                          fontWeight: "700",
                        }}
                      >
                        Add photos
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={{ flex: 1 }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("CameraComponent");
                        }}
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          height: 30,
                          width: 30,
                          zIndex: 999,
                          borderRadius: 15,
                          backgroundColor: "#A9A9A9",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <MaterialIcons name="close" size={20} color="white" />
                      </TouchableOpacity>
                      <Image
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 8,
                          resizeMode: "cover",
                          backgroundColor: "#9A9A9A",
                        }}
                        source={{
                          uri: route?.params?.image,
                        }}
                      />
                    </View>
                  )}
                </View>
              )}
            </View>
            {/* Buttons */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: "5%",
                paddingHorizontal: 35,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  // justifyContent: "center",
                  alignItems: "center",
                  width: "30%",
                }}
              >
                <TouchableOpacity
                  onPress={() => setcamera(!camera)}
                  style={{ paddingRight: 16 }}
                >
                  <Image
                    source={require("../assets/gallery.png")}
                    style={{
                      height: 30,
                      width: 30,
                      justifyContent: "center",
                    }}
                  />
                </TouchableOpacity>
                <Image
                  source={require("../assets/video.png")}
                  style={{ height: 30, width: 30, justifyContent: "center" }}
                />
              </View>

              <TouchableOpacity
                onPress={() => postHandler()}
                style={{
                  height: 45,
                  backgroundColor: colors.primary,
                  borderRadius: 12,
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14 / fontScale, color: "white" }}>
                  Post
                </Text>
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* <Button
        style={styles.button}
        mode="contained"
        color="blue"
        onPress={() => postHandler()}
      >
        Post
      </Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : "7.5%",
  },
  image: {
    width: "95%",
    height: "80%",
    margin: "3%",
    borderRadius: 12,
    resizeMode: "contain",
    backgroundColor: "#9A9A9A",
  },
  imageCon: {
    borderRadius: 30,
    elevation: 50,
  },
  input: {
    flex: 0.5,
    backgroundColor: colors.input,
    borderRadius: 15,
    elevation: 5,
    marginHorizontal: 20,
    padding: 18,
  },
  button: {
    borderRadius: 45,
    elevation: 10,
    height: 40,
    width: 320,
    textAlign: "center",
    marginLeft: "5%",
    marginRight: "1%",
    marginBottom: "4%",
    marginTop: "4%",
    color: "blue",
  },
});
export default CreatePost;
