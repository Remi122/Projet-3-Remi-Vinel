import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import axiosError from "../utils/axiosError";
import DataContext from "../context/DataContext";

const PostDelete = () => {
  const { posts, setPosts, auth, navigate, postURL } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post._id === id);

  const deleteAPost = async (id) => {
    try {
      const response = await axios.delete(`${postURL}/${id}`, {
        headers: {
          authorization: auth.accessToken,
        },
      });
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      console.log(response.data);
      navigate("/groupomania");
    } catch (err) {
      axiosError(err);
    }
  };

  return (
    <main className="groupomania-main">
      <section className="feed-header">
        <h2>Suppression de Post</h2>
      </section>

      <section className="feed suppression-block">
        <h3>Etes vous sur de vouloir supprimer le message :</h3>
        <p>
          {post.message.length <= 50
            ? post.message
            : `${post.message.slice(0, 50)}...`}
        </p>
        {post.imageUrl ? (
          <p>Et son image : {post.imageUrl.split("images/")[1]}</p>
        ) : null}
        <div>
          <button
            onClick={() => deleteAPost(post._id)}
            className="delete-button"
          >
            Supprimer
          </button>
          <button className="modify-button">
            <Link to="/groupomania">Annuler</Link>
          </button>
        </div>
      </section>
    </main>
  );
};

export default PostDelete;
