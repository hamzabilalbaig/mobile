import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  useWindowDimensions,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { Button, Surface } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/Colors";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginUser } from "../redux/Actions/User";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

const SignIn = () => {
  const { fontScale } = useWindowDimensions();
  const navigation = useNavigation();
  const { isAuthenticated, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    dispatch(loginUser(email, password));
    if (error) {
      alert(error, "or the Email/Password might be incorrect");
    }
  };

  const [secure, setsecure] = useState(false);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Welcome to Dotex</Text> */}
      <View style={{ height: "25%" }}>
        <Image
          source={require("../assets/logo.png")}
          style={{ height: "100%", width: "100%", resizeMode: "contain" }}
        />
      </View>

      <View>
        <Text
          style={{
            color: "#515151",
            fontSize: 18 / fontScale,
            fontWeight: "600",
          }}
        >
          Login to your account
        </Text>
      </View>
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
          style={{ width: "80%" }}
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
      <TouchableOpacity style={{ paddingVertical: 10 }}>
        <Text style={styles.textButton}>Forgot Password</Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          marginBottom: "7.5%",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => loginHandler()}
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
            Log In
          </Text>
        </TouchableOpacity>
        {/* <Button mode="contained" color="blue" onPress={() => loginHandler()}>
          Log In
        </Button> */}

        <Text style={{ color: "grey", paddingTop: "5%" }}>
          Don't have an account?{"  "}
          <Text
            style={styles.textButton}
            onPress={() =>
              navigation.navigate("Signup", {
                image:
                  "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
              })
            }
          >
            Sign Up
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
  textButton: {
    textAlign: "center",
    margin: "4%",
    color: "#0081C6",
    textDecorationLine: "underline",
  },
});

export default SignIn;
