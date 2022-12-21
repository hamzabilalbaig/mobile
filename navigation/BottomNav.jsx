import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home";
import Chat from "../Screens/Chat";
import CreatePost from "../Screens/CreatePost";
import Reels from "../Screens/Reels";
import Rooms from "../Screens/Rooms";
import Conversations from "../Screens/Conversations";
import { colors } from "../constants/Colors";
import Icons from "react-native-vector-icons/AntDesign";
import MIcons from "react-native-vector-icons/MaterialIcons";
import FIcons from "react-native-vector-icons/FontAwesome";
const Tab = createBottomTabNavigator();

const Custom = ({ focused, IconName, Ic, title }) => {
  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", paddingTop: 10 }}
    >
      <Ic
        name={IconName}
        color={focused ? colors.primary : "#748c94"}
        size={25}
      />
      <Text
        style={{
          color: focused ? colors.primary : "#748c94",
          fontSize: 12,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          elevation: 0,
          backgroundColor: "#fff",
          borderRadius: 15,
          height: 70,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Custom
              Ic={MIcons}
              IconName="home-filled"
              title={"Home"}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Conversations"
        component={Conversations}
        options={{
          tabBarIcon: ({ focused }) => (
            <Custom
              Ic={MIcons}
              IconName="chat-bubble"
              title={"Chat"}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icons name="pluscircle" color={colors.primary} size={54} />
          ),
        }}
      />
      <Tab.Screen
        name="Reels"
        component={Reels}
        options={{
          tabBarIcon: ({ focused }) => (
            <Custom
              Ic={MIcons}
              IconName="video-library"
              title={"Reels"}
              focused={focused}
            />
          ),
          tabBarStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Rooms"
        component={Rooms}
        options={{
          tabBarIcon: ({ focused }) => (
            <Custom
              Ic={FIcons}
              IconName="group"
              title={"Rooms"}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;

const styles = StyleSheet.create({});
