import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera, CameraType } from "expo-camera";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import IImageConverter from "react-native-image-converter";

const CameraComponent = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      mediaTypes: "Videos",
    }).then((e) => {
      console.log(e, "image library");
      return navigation.navigate("CreatePost", { image: e.uri });
    });
  };

  const clickPicture = async () => {
    const data = await camera.takePictureAsync();
    console.log(data.uri);
    return navigation.navigate("CreatePost", { image: data.uri });
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        type={type}
        style={{ flex: 1, aspectRatio: 1 }}
        ratio="1:1"
        ref={(e) => setCamera(e)}
      />

      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 10,
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <Icon
          name="image"
          size={40}
          color="#fff"
          onPress={openImagePickerAsync}
        />
        <Icon name="camera" size={40} color="#fff" onPress={clickPicture} />

        <Icon
          name="flip-camera-android"
          size={40}
          color="#fff"
          onPress={() =>
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            )
          }
        />
      </View>
    </View>
  );
};

export default CameraComponent;
