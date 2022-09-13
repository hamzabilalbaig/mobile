import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Icons from "react-native-vector-icons/MaterialIcons";

const Header = ({
  firstNavigate,
  firstIcon,
  firstColor,
  title,
  SecNavigate,
  SecIcon,
  SecColor,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate({ firstNavigate })}>
        <Icons name={firstIcon} size={30} color={firstColor} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate({ SecNavigate })}>
        <Icons name={SecIcon} size={30} color={SecColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  title: { fontSize: 25, color: "blue", marginHorizontal: "25%" },
});

export default Header;
