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
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/Colors";
import { useState } from "react";
import Header from "../Components/Header";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../redux/Actions/Post";
import * as FileSystem from "expo-file-system";
import { useEffect } from "react";
import Loader from "../Components/Loader";

const CreatePost = ({ navigation, route }) => {
  const { image } = route.params;
  const [captionValue, setCaptionValue] = useState("No Caption");
  const [imageValue, setImageValue] = useState(null);

  const dispatch = useDispatch();
  const { loading, message } = useSelector((state) => state.like);

  const postHandler = async () => {
    // if (imageValue) {
    //   await dispatch(createNewPost(captionValue, imageValue));
    //   alert("Post Created");
    //   navigation.navigate("home");
    // } else {
    //   await dispatch(createNewPost(captionValue, image));
    //   alert("Post Created");
    //   navigation.navigate("home");
    // }
    console.log(image);
    FileSystem.readAsStringAsync("image.jpg", {
      encoding: "base64",
    }).then((i) => setImageValue(`data:image/png;base64,${i}`));
    console.log(imageValue);
    // await dispatch(createNewPost(captionValue, imageValue));
  };

  useEffect(() => {
    FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    }).then((i) => setImageValue(`data:image/png;base64,${i}`));
  }, [FileSystem, image]);

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <SafeAreaView>
        <Header
          firstIcon={"home"}
          firstNavigate={"home"}
          firstColor={colors.lightBackground}
          title={"Create Post"}
          SecIcon={"home"}
          SecNavigate={"home"}
          SecColor={colors.lightBackground}
        />

        <TouchableHighlight
          style={styles.imageCon}
          onPress={() => {
            navigation.navigate("CameraComponent");
          }}
        >
          <Image
            style={styles.image}
            source={{
              uri: image,
            }}
          />
        </TouchableHighlight>

        <TextInput
          multiline={true}
          style={styles.input}
          placeholder="Enter your Caption"
          onChangeText={(e) => setCaptionValue(e)}
        />
        <Button
          style={styles.button}
          mode="contained"
          color="blue"
          onPress={() => postHandler()}
        >
          Post
        </Button>
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
  image: {
    width: 335,
    height: 200,
    margin: "3%",
    borderRadius: 30,
  },
  imageCon: {
    borderRadius: 30,
    elevation: 50,
  },
  input: {
    backgroundColor: colors.input,
    borderRadius: 15,
    elevation: 10,
    height: 80,
    width: 320,
    textAlign: "center",
    marginLeft: "5%",
    marginRight: "1%",
    marginBottom: "4%",
    marginTop: "6%",
    color: "blue",
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
