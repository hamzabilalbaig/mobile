import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
  StatusBar,
} from "react-native";

import React from "react";
import { Video } from "expo-av";
import { useRef } from "react";
import { useState } from "react";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  deletePost,
  getReel,
  likePost,
  updatePost,
} from "../redux/Actions/Post";
import axios from "axios";
import { useEffect } from "react";
import { serverURL } from "../constants/Config";
import { Modalize } from "react-native-modalize";
import { colors } from "../constants/Colors";

const Reel = ({ item, index, currentIndex }) => {
  const { height, width, fontScale } = useWindowDimensions();

  const navigation = useNavigation();
  const videoRef = useRef(null);
  const [commentValue, setCommentValue] = useState("");

  const onBuffer = (buffer) => {
    console.log("buffering", buffer);
  };
  const onError = (error) => {
    console.log("error", error);
  };

  const [mute, setMute] = useState(false);

  const { user } = useSelector((state) => state.user);
  const [like, setLiked] = useState(false);
  const [num, setNum] = useState(0);

  useEffect(() => {
    item.likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [user._id]);

  const handleLike = async () => {
    setLiked(!like);
    if (like && num === 0) {
      setNum(-1);
    } else if (!like && num === -1) {
      setNum(0);
    } else if (like && num === 1) {
      setNum(0);
    } else if (!like && num === 0) {
      setNum(1);
    }

    await axios
      .get(`${serverURL}/reel/${item._id}`)
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
  };
  const dispatch = useDispatch();

  const handleComment = async () => {
    await axios
      .put(`${serverURL}/reel/comment/${item._id}`, {
        comment: commentValue,
      })
      .then((res) => {
        dispatch(getReel());
        console.log(res.data);
      })
      .catch((e) => console.log(e.response.data));
  };
  const commentModalRef = useRef(null);

  const { reels, loading, error } = useSelector((state) => state.reel);

  const [reelData, setreelData] = useState([]);

  const getReel = async (id) => {
    console.log(id);
    await axios
      .post(`${serverURL}/reel/getReelById`, {
        id: id,
      })
      .then((res) => {
        setreelData(res.data.reel.comments);
        console.log(res.data.success);
      })
      .catch((e) => console.log(e));
  };

  return (
    <View
      style={{
        width: width,
        height: height,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setMute(!mute)}
        style={{ width: width, height: height, position: "absolute" }}
      >
        <Video
          ref={videoRef}
          onBuffer={onBuffer}
          onError={onError}
          shouldPlay={true}
          // useNativeControls
          isLooping
          resizeMode="cover"
          source={item.video}
          ignoreSilentSwitch={"ignore"}
          isMuted={mute}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ position: "absolute", top: "4%", left: "4%" }}
        onPress={() => navigation.goBack(null)}
      >
        <MaterialIcons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ position: "absolute", top: "4%", right: "4%" }}
        onPress={() => {
          navigation.navigate("CameraComponent", { video: true });
        }}
      >
        <MaterialIcons name="camera-alt" size={28} color="white" />
      </TouchableOpacity>
      <View
        style={{
          position: "absolute",
          bottom: 0, //edited
          right: 0,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={handleLike} style={{ padding: 5 }}>
          <AntDesign
            name={like ? "heart" : "hearto"}
            color={like ? "red" : "white"}
            size={25}
          />
          <Text style={{ color: "white", textAlign: "center" }}>
            {item?.likes.length + num}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => {
            commentModalRef.current.open();
            getReel(item._id);
          }}
        >
          <Ionicons name="ios-chatbubble-outline" color="white" size={25} />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <Ionicons name="paper-plane-outline" color="white" size={25} />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <Feather name="more-vertical" color="white" size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("UserProfile", user._id);
          }}
          style={{
            width: 30,
            height: 30,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "white",
            margin: 10,
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
              resizeMode: "cover",
            }}
            source={{ uri: user?.avatar.url }}
          />
        </TouchableOpacity>
      </View>

      <Modalize
        ref={commentModalRef}
        modalStyle={{ backgroundColor: "#d2d2d2" }}
        HeaderComponent={
          <View
            style={{
              marginHorizontal: 20,
              marginVertical: 5,
              borderBottomWidth: 0.5,
              borderBottomColor: "#9b9b9b",
            }}
          >
            <View
              style={{
                width: 120,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: colors.primary,
                borderBottomWidth: 1.5,
              }}
            >
              <Text style={{ fontWeight: "500", color: colors.primary }}>
                {`Comments  (${reelData.length})`}
              </Text>
            </View>
          </View>
        }
        snapPoint={350}
      >
        <View
          style={{
            height: null,
            backgroundColor: colors.input,
            marginHorizontal: 20,
            borderRadius: 12,
            marginBottom: 20,
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <TextInput
            multiline={true}
            placeholder="Enter your Comment"
            onChangeText={(e) => setCommentValue(e)}
            value={commentValue}
            onBlur={() => Keyboard.dismiss()}
            style={{ marginHorizontal: 18, marginVertical: 15, width: "80%" }}
          />

          <TouchableOpacity
            disabled={commentValue === "" ? true : false}
            onPress={handleComment}
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              paddingRight: 25,
            }}
          >
            <MaterialCommunityIcons
              name="send"
              size={24}
              color={commentValue === "" ? "grey" : colors.primary}
            />
          </TouchableOpacity>
        </View>

        {reelData.map((i, index) => {
          console.log(i);
          return (
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 5,
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{ flex: 0.125 }}
                onPress={() => {
                  navigation.navigate("UserProfile", i.user._id);
                }}
              >
                <Image
                  source={{
                    uri: i?.user?.avatar?.url,
                  }}
                  style={{ height: 50, width: 50, borderRadius: 25 }}
                />
              </TouchableOpacity>

              <View style={styles.nameCon}>
                <View style={{ paddingHorizontal: 0 }}>
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 8,
                    }}
                    onPress={() => {
                      navigation.navigate("UserProfile", i._id);
                    }}
                  >
                    <Text style={styles.name}>{i.user.name}</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      padding: 10,
                    }}
                  >
                    <Text style={styles.comment}>{i.comment}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    justifyContent: "flex-start",
                    paddingRight: 10,
                    paddingTop: 10,
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="trash-can"
                    size={22}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </Modalize>
    </View>
  );
};

export default Reel;

const styles = StyleSheet.create({
  name: {
    marginLeft: "3%",
    color: colors.textPrimary,
    fontWeight: "700",
  },
  nameCon: {
    flex: 0.875,
    marginLeft: 20,
    backgroundColor: colors.input,
    height: null,
    padding: 2,
    paddingTop: 10,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
