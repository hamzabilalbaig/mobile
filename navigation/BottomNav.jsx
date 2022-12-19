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
const Tab = createBottomTabNavigator();

const AddPostTav = ({ children, onPress }) => {
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        backgroundColor: colors.primary,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>;
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
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={require("../assets/home.png")}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? colors.primary : "#748c94",
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: focused ? colors.primary : "#748c94",
                  fontSize: 12,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Conversations"
        component={Conversations}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={require("../assets/chat.png")}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? colors.primary : "#748c94",
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: focused ? colors.primary : "#748c94",
                  fontSize: 12,
                }}
              >
                Chat
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          tabBarIcon: ({ focused }) => (
            // <Image
            //   source={require("../assets/add.png")}
            //   style={{
            //     width: 60,
            //     height: 60,
            //     tintColor: colors.primary,
            //   }}
            //   resizeMode="contain"
            // />

            <Icons name="pluscircle" color={colors.primary} size={54} />
          ),
          //   tabBarButton: ({ props }) => <AddPostTav {...props} />,
        }}
      />
      <Tab.Screen
        name="Reels"
        component={Reels}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={require("../assets/reels.png")}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? colors.primary : "#748c94",
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: focused ? colors.primary : "#748c94",
                  fontSize: 12,
                }}
              >
                Reels
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Rooms"
        component={Rooms}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={require("../assets/rooms.png")}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? colors.primary : "#748c94",
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: focused ? colors.primary : "#748c94",
                  fontSize: 12,
                }}
              >
                Rooms
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;

const styles = StyleSheet.create({});
