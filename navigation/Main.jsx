import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import SignIn from "../Screens/SignIn";
import Home from "../Screens/Home";
import Footer from "../Components/Footer";
import Chat from "../Screens/Chat";
import Reels from "../Screens/Reels";
import Rooms from "../Screens/Rooms";
import CreatePost from "../Screens/CreatePost";
import Signup from "../Screens/Signup";
import Loader from "../Components/Loader";
import { deleteMyProfile, loadUser } from "../redux/Actions/User";
import Search from "../Screens/Search";
import UserProfile from "../Screens/UserProfile";
import Likes from "../Screens/Likes";
import Comments from "../Screens/Comments";
import EditProfile from "../Screens/EditProfile";
import CameraComponent from "../Screens/CameraComponent";
import CameraComponent2 from "../Screens/CameraComponent2";
import CameraComponent3 from "../Screens/CameraComponent3";
import Account from "../Screens/Account";

const Stack = createNativeStackNavigator();

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  return loading ? (
    <Loader />
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          isAuthenticated ? "home" : "Sign In"
          // "Sign In"
        }
      >
        <Stack.Screen
          name="Sign In"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Reels"
          component={Reels}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Rooms"
          component={Rooms}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Likes"
          component={Likes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Comments"
          component={Comments}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CameraComponent"
          component={CameraComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CameraComponent2"
          component={CameraComponent2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CameraComponent3"
          component={CameraComponent3}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>

      {isAuthenticated && <Footer />}
    </NavigationContainer>
  );
};

export default Main;
