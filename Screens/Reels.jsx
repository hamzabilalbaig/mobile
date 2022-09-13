import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/Colors";

const Reels = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text onPress={() => navigation.navigate("Reels")}>
          Reels Will be in the final version
        </Text>
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
});
export default Reels;
