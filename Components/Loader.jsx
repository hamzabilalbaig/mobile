import { Text, View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";

const Loader = () => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ paddingBottom: 20 }}>Please wait</Text>
      <ActivityIndicator animating={true} size={100} color="blue" />
    </View>
  );
};

export default Loader;
