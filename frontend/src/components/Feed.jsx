import { useEffect, useContext } from "react";
import DataContext from "../context/DataContext";
import Post from "./Post";
import axios from "axios";
import axiosError from "../utils/axiosError";

const Feed = () => {
  const { postURL, auth, posts, setPosts } = useContext(DataContext);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get(`${postURL}`, {
          headers: {
            authorization: auth.accessToken,
          },
        });
        const reverseData = response.data.reverse();
        setPosts(reverseData);
      } catch (err) {
        axiosError(err);
      }
    };
    fetchAllPosts();
  }, [auth.accessToken, postURL, setPosts]);

  return (
    <section className="feed">
      {posts.length ? (
        posts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <p>No posts to display.</p>
      )}
    </section>
  );
};

export default Feed;
