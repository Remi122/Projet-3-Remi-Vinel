import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataContext from "../context/DataContext";
import axios from "axios";
import axiosError from "../utils/axiosError";

import {
  FaThumbsDown,
  FaThumbsUp,
  FaRegThumbsDown,
  FaRegThumbsUp,
} from "react-icons/fa";

const PostFooter = ({ post }) => {
  const { auth, ROLES, postURL } = useContext(DataContext);
  const [like, setLike] = useState(0);

  const likePost = async (id, newIndex) => {
    const userId = JSON.parse(sessionStorage.getItem("groupomaniaId")).userId;
    const updatedPost = { userId: userId, like: newIndex };

    try {
      const response = await axios.put(`${postURL}/${id}/like`, updatedPost, {
        headers: {
          authorization: auth.accessToken,
        },
      });
      console.log(response.data);
    } catch (err) {
      axiosError(err);
    }
  };

  const newLike = () => {
    if (like === 0) {
      setLike(1);
      likePost(post._id, 1);
    } else if (like === 1) {
      setLike(0);
      likePost(post._id, 0);
    } else {
      console.log("Retirer votre dislike avant de like");
    }
  };

  const newDislike = () => {
    if (like === 0) {
      setLike(-1);
      likePost(post._id, -1);
    } else if (like === -1) {
      setLike(0);
      likePost(post._id, 0);
    } else {
      console.log("Retirer votre dislike avant de like");
    }
  };

  useEffect(() => {
    if (
      post.usersLiked.find((user) => user === auth.userId) === undefined &&
      post.usersDisliked.find((user) => user === auth.userId) === undefined
    ) {
      setLike(0);
    }
    if (
      post.usersDisliked.find((user) => user === auth.userId) === auth.userId
    ) {
      setLike(-1);
    }
    if (post.usersLiked.find((user) => user === auth.userId) === auth.userId) {
      setLike(1);
    }
  }, [auth.userId, post.usersDisliked, post.usersLiked]);

  return (
    <div className="post-footer">
      <div className="likeble-block">
        <div className="liked-block">
          {like === 1 ? (
            <FaThumbsUp fill="#6e96ff" onClick={newLike} />
          ) : (
            <FaRegThumbsUp fill="#4e5166" onClick={newLike} />
          )}
          <p>{post.likes}</p>
        </div>
        <div className="disliked-block">
          {like === -1 ? (
            <FaThumbsDown fill="#ff412c" onClick={newDislike} />
          ) : (
            <FaRegThumbsDown fill="#4e5166" onClick={newDislike} />
          )}
          <p>{post.dislikes}</p>
        </div>
      </div>

      <div className="nav-edit-post">
        {auth.role === ROLES.Admin || auth.userId === post.userId ? (
          <button className="modify-button">
            <Link to={`/groupomania/${post._id}`}>Modifier</Link>
          </button>
        ) : null}

        {auth.role === ROLES.Admin || auth.userId === post.userId ? (
          <button className="delete-button">
            <Link to={`/groupomania/delete/${post._id}`}>Supprimer</Link>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default PostFooter;
