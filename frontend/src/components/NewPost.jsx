import { useState, useContext } from "react";
import { format } from "date-fns";
import axios from "axios";
import axiosError from "../utils/axiosError";
import DataContext from "../context/DataContext";

const NewPost = () => {
  const [postMessage, setPostMessage] = useState("");
  const { auth, postURL } = useContext(DataContext);

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const newPostSubmit = async () => {
    let newPost;
    const userId = JSON.parse(sessionStorage.getItem("groupomaniaId")).userId;
    const date = format(new Date(), "dd/MM yyyy, h:m:ss");
    const userName = JSON.parse(
      sessionStorage.getItem("groupomaniaId")
    ).userName;

    if (file) {
      newPost = new FormData();
      newPost.append("file", file);
      newPost.append("fileName", fileName);
      newPost.append("userId", userId);
      newPost.append("userName", userName);
      newPost.append("date", date);
      newPost.append("message", postMessage);
    } else {
      newPost = { userId, userName, date, message: postMessage };
    }

    try {
      const response = await axios.post(`${postURL}`, newPost, {
        headers: {
          authorization: auth.accessToken,
        },
      });
      console.log(response.data);
      setPostMessage("");
      setFile();
      setFileName("");
    } catch (err) {
      axiosError(err);
    }
  };

  return (
    <section className="feed-set-post">
      <form
        className="feed-form"
        encType="mutipart/form-data"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="message">Ecrire un post : </label>
        <label htmlFor="add-image">Ajouter une image</label>
        <input
          type="file"
          name="add-image"
          id="add-image"
          onChange={(e) => saveFile(e)}
        />
        <div>
          <textarea
            id="message"
            required
            value={postMessage}
            onChange={(e) => setPostMessage(e.target.value)}
          />
          <button type="submit" onClick={newPostSubmit}>
            Envoyer
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewPost;
