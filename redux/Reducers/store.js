import { configureStore } from "@reduxjs/toolkit";
import {
  allUsersReducer,
  postOfFollowingReducer,
  userConversationReducer,
  userMessageReducer,
  userProfileReducer,
  userReducer,
} from "./User";
import {
  getReelReducer,
  likeReducer,
  myPostsReducer,
  userPostsReducer,
} from "./Post";

const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allUsersReducer,
    like: likeReducer,
    myPosts: myPostsReducer,
    userProfile: userProfileReducer,
    userPosts: userPostsReducer,
    conversation: userConversationReducer,
    message: userMessageReducer,
    reel: getReelReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
