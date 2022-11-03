import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import DataContext from "../context/DataContext";
import axios from "axios";
import axiosError from "../utils/axiosError";

const PostUpdate = () => {
  const { id } = useParams();
  const { posts, auth, postURL, navigate } = useContext(DataContext);
  const post = posts.find((post) => post._id === id);
  const [editMessage, setEditMessage] = useState("");
  const [editImage, setEditImage] = useState("");

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    console.log(e.target.files[0]);
    console.log(e.target.files[0].name);
  };

  useEffect(() => {
    setEditMessage(post.message);
    if (post.imageUrl) setEditImage(post.imageUrl.split("images/")[1]);
  }, [post]);

  const editPost = async (id) => {
    let updatedPost;
    const userId = JSON.parse(sessionStorage.getItem("groupomaniaId")).userId;

    if (file) {
      updatedPost = new FormData();
      updatedPost.append("file", file);
      updatedPost.append("fileName", fileName);
      updatedPost.append("userId", userId);
      updatedPost.append("userName", post.userName);
      updatedPost.append("date", post.date);
      updatedPost.append("message", editMessage);
    } else {
      updatedPost = { userId: userId, message: editMessage };
    }

    try {
      const response = await axios.put(`${postURL}/${id}`, updatedPost, {
        headers: {
          authorization: auth.accessToken,
        },
      });
      console.log(response.data);
      setEditMessage("");
      setEditImage("");
      setFile();
      setFileName("");
      navigate("/groupomania");
    } catch (err) {
      axiosError(err);
    }
  };

  return (
    <section className="feed-set-post">
      {editMessage && (
        <>
          <form className="feed-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="message">Message à éditer :</label>
            <p>{!file ? editImage : fileName}</p>
            <input
              type="file"
              name="image"
              id="image"
              onChange={(e) => saveFile(e)}
            />
            <div>
              <textarea
                id="message"
                required
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
              />
              {/* setEditMessage(e.target.value) */}
              <div>
                <button type="submit" onClick={() => editPost(post._id)}>
                  Modifier
                </button>
                <p>
                  <Link to="/groupomania">Annuler</Link>
                </p>
              </div>
            </div>
          </form>
        </>
      )}
      {!editMessage && (
        <>
          <h2>Message non trouvé</h2>
          <p>c'est un peu problématique</p>
          <p>
            <Link to="/groupomania">Retour au fil de discussion</Link>
          </p>
        </>
      )}
    </section>
  );
};

export default PostUpdate;
