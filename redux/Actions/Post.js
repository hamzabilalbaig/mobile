import axios from "axios";
import { serverURL } from "../../constants/Config";
// const serverURL = "http://dotexx.herokuapp.com/api/v1";

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });

    const { data } = await axios.get(`${serverURL}/post/${id}`);
    dispatch({
      type: "likeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error.response.data.message,
    });
  }
};

export const addCommentOnPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "addCommentRequest",
    });
    console.log("req");
    const { data } = await axios.put(
      `${serverURL}/post/comment/${id}`,
      {
        comment,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "addCommentSuccess",
      payload: data.message,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: "addCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCommentRequest",
    });

    const { data } = await axios.delete(`${serverURL}/post/comment/${id}`, {
      data: { commentId },
    });
    dispatch({
      type: "deleteCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const createNewPost = (caption, image) => async (dispatch) => {
  try {
    dispatch({
      type: "newPostRequest",
    });
    console.log(image, "action");
    const { data } = await axios
      .post(
        `${serverURL}/post/upload`,
        {
          caption,
          image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((e) => {
        console.log(e);
      });
    dispatch({
      type: "newPostSuccess",
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: "newPostFailure",
      payload: error.response,
    });
    console.log(error.response, "image upload error");
  }
};

export const createNewReel = (caption, image) => async (dispatch) => {
  try {
    dispatch({
      type: "newReelRequest",
    });
    console.log(image, "action");
    const { data } = await axios
      .post(
        `${serverURL}/reel/upload`,
        {
          caption: caption,
          reel: image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((e) => {
        console.log(e);
      });
    dispatch({
      type: "newReelSuccess",
      payload: data,
    });
    console.log(data, "reels data");
  } catch (error) {
    dispatch({
      type: "newReelFailure",
      payload: error.response,
    });
    console.log(error.response, "upload error");
  }
};

export const getReel = () => async (dispatch) => {
  try {
    dispatch({
      type: "getReelRequest",
    });
    console.log("req");
    const { data } = await axios.get(`${serverURL}/reels`);
    dispatch({
      type: "getReelSuccess",
      payload: data,
    });
    // console.log(data);
  } catch (error) {
    dispatch({
      type: "ReelFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatePost = (caption, id) => async (dispatch) => {
  try {
    dispatch({
      type: "updateCaptionRequest",
    });

    const { data } = await axios.put(
      `${serverURL}/post/${id}`,
      {
        caption,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "updateCaptionSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateCaptionFailure",
      payload: error.response.data.message,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePostRequest",
    });

    const { data } = await axios.delete(`${serverURL}/post/${id}`);
    dispatch({
      type: "deletePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletePostFailure",
      payload: error.response.data.message,
    });
  }
};
