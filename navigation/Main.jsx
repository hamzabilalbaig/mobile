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
import Conversations from "../Screens/Conversations";
import BottomNav from "./BottomNav";

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
        screenOptions={{ headerShown: false }}
        initialRouteName={isAuthenticated ? "BottomNav" : "Sign In"}
      >
        <Stack.Screen name="Sign In" component={SignIn} />
        <Stack.Screen name="BottomNav" component={BottomNav} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="Likes" component={Likes} />
        <Stack.Screen name="Comments" component={Comments} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="CameraComponent" component={CameraComponent} />
        <Stack.Screen name="CameraComponent2" component={CameraComponent2} />
        <Stack.Screen name="CameraComponent3" component={CameraComponent3} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Account" component={Account} />
      </Stack.Navigator>

      {/* {isAuthenticated && <Footer />} */}
    </NavigationContainer>
  );
};

export default Main;
