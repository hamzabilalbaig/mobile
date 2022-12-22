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
import { useDispatch, useSelector } from "react-redux";
import { loadUser, registerUser, updateProfile } from "../redux/Actions/User";
import Icons from "react-native-vector-icons/MaterialIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const EditProfile = ({ route }) => {
  const { user } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const { fontScale } = useWindowDimensions();

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
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
            style={{
              fontSize: 24 / fontScale,
              fontWeight: "600",
              color: "grey",
            }}
          >
            Edit Profile
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="close"
              size={30}
              color="black"
              style={{ opacity: 0.4 }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.imageCon}
          onPress={() => {
            navigation.navigate("CameraComponent3");
          }}
        >
          <View style={styles.profile}>
            <Image
              style={{
                height: 150,
                width: 150,
                borderRadius: 150 / 2,
                backgroundColor: "red",
              }}
              source={{
                uri: image,
              }}
            />
          </View>
        </TouchableOpacity>

        <Surface style={styles.input}>
          <TextInput
            value={name}
            onChangeText={(e) => setName(e)}
            placeholder="Name"
          />
        </Surface>

        <Surface style={styles.input}>
          <TextInput
            value={email}
            onChangeText={(e) => setEmail(e)}
            placeholder="Email"
          />
        </Surface>

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

        {/* <Button
          style={styles.signup}
          mode="contained"
          color="blue"
          onPress={() => EditProfileHandler()}
        >
          Confirm
        </Button> */}
      </KeyboardAvoidingView>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          marginBottom: "5%",
          alignItems: "center",
          marginHorizontal: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => EditProfileHandler()}
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
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : "7.5%",
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
    marginHorizontal: 20,
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
    marginVertical: "8%",
    alignSelf: "center",
    elevation: 5,
    borderRadius: 360,
    height: 150,
    width: 150,
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
