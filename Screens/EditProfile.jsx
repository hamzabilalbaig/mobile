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
  Modal,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/Colors";
import Header from "../Components/Header";
import { Avatar, Button } from "react-native-paper";
import { useState } from "react";
import * as FileSystem from "expo-file-system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, registerUser, updateProfile } from "../redux/Actions/User";
import Icons from "react-native-vector-icons/MaterialIcons";

const EditProfile = ({ navigation, route }) => {
  const { user } = useSelector((state) => state.user);

  const { image } = route.params;

  const [name, setName] = useState(user.name);

  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(null);
  const [updateModal, setUpdateModal] = useState(false);

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const dispatch = useDispatch();

  const { error, message } = useSelector((state) => state.like);

  useEffect(() => {
    FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    }).then((i) => setAvatar(`data:image/png;base64,${i}`));
  }, [FileSystem, image]);

  const EditProfileHandler = async () => {
    await dispatch(updateProfile(name, email, avatar));
    dispatch(loadUser());
  };
  const UpdatePassHandler = async () => {
    await dispatch(updatePassword(oldPass, newPass));
    alert("password Updated");
    dispatch(loadUser());
    navigation.navigate("UserProfile");
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView>
        <Text style={styles.title}>Edit Profile</Text>

        <TouchableHighlight
          style={styles.imageCon}
          onPress={() => {
            navigation.navigate("CameraComponent3");
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
          value={name}
          style={styles.input}
          onChangeText={(e) => setName(e)}
          placeholder="Name"
        ></TextInput>
        <TextInput
          value={email}
          style={styles.input}
          onChangeText={(e) => setEmail(e)}
          placeholder="Email"
        ></TextInput>
        <Text
          style={styles.textButton}
          onPress={() => setUpdateModal(!updateModal)}
        >
          Update Password
        </Text>
        <Modal
          animationType="slide"
          transparent={false}
          visible={updateModal}
          onRequestClose={() => {
            setUpdateModal(!updateModal);
          }}
        >
          <View>
            <View style={styles.header}>
              <Icons
                onPress={() => {
                  setUpdateModal(!updateModal);
                }}
                name="close"
                size={30}
                color="red"
              />

              <Text style={styles.title}>Update Password</Text>
              <Icons name="close" size={30} color={colors.lightBackground} />
            </View>
            <TextInput
              style={styles.inputt}
              onChangeText={(e) => setOldPass(e)}
              placeholder="Old Password"
            ></TextInput>
            <TextInput
              style={styles.inputt}
              onChangeText={(e) => setNewPass(e)}
              placeholder="New Password"
            ></TextInput>
            <Button
              style={styles.signupp}
              mode="contained"
              color="blue"
              onPress={() => UpdatePassHandler()}
            >
              Update Password
            </Button>

            {/* <Button
              style={styles.signupp}
              mode="contained"
              color="blue"
              onPress={() => {
                dispatch({ type: "clearErrors" });
                dispatch({ type: "clearMessage" });
              }}
            >
              Update Password
            </Button> */}
          </View>
        </Modal>
        <Button
          style={styles.signup}
          mode="contained"
          color="blue"
          onPress={() => EditProfileHandler()}
        >
          Confirm
        </Button>
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
  inputt: {
    backgroundColor: colors.input,
    borderRadius: 45,
    elevation: 10,
    height: 40,
    width: 300,
    textAlign: "center",
    margin: "2%",
    marginVertical: "4%",
    color: "blue",
    marginLeft: "8%",
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
  signupp: {
    borderRadius: 45,
    elevation: 10,
    height: 40,
    width: 300,
    textAlign: "center",
    marginBottom: "4%",
    textAlign: "center",
    margin: "2%",
    marginVertical: "4%",
    marginLeft: "8%",
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
  header: {
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  title: { fontSize: 25, color: "blue", marginHorizontal: "25%" },
  textButton: {
    textAlign: "center",
    margin: "4%",
    color: "blue",
    textDecorationLine: "underline",
  },
});
export default EditProfile;
