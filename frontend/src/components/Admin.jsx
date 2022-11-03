import { useEffect, useContext } from "react";
import axios from "axios";
import DataContext from "../context/DataContext";
import axiosError from "../utils/axiosError";

const Admin = () => {
  const { users, setUsers, authURL, auth } = useContext(DataContext);
  const { posts, setPosts, postURL } = useContext(DataContext);
  useEffect(() => {

    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`${authURL}/users`, {
          headers: {
            authorization: auth.accessToken,
          },
        });
        setUsers(response.data);
      } catch (err) {
        axiosError(err);
      }
    };

    const fetchAllPost = async () => {
      try {
        const response = await axios.get(`${postURL}/`, {
          headers: {
            authorization: auth.accessToken,
          },
        });
        setPosts(response.data);
      } catch (err) {
        axiosError(err);
      }
    };

    fetchAllUsers();
    fetchAllPost();
  }, [setUsers, setPosts , authURL, postURL, auth.accessToken]);

  const deleteAUser = async (id) => {
    try {
      await axios.delete(`${authURL}/user/${id}`, {
        headers: {
          authorization: auth.accessToken,
        },
      });
      const usersList = users.filter((user) => user._id !== id);
      setUsers(usersList);
    } catch (err) {
      axiosError(err);
    }
  };
  const deletePost = async (id) => {
    try {
      await axios.delete(`${postURL}/${id}`, {
        headers: {
          authorization: auth.accessToken,
        },
      });
      const postList = posts.filter((post) => post._id !== id);
      setPosts(postList);
    } catch (err) {
      axiosError(err);
    }
  };

  return (
    <main className="groupomania-main">
      <section className="administration-header">
        <h2>Administration</h2>
      </section>

      <section className="administration-feed">
        <table>
          <thead>
            <tr>
              <th colSpan={3}>Utilisateurs</th>
            </tr>
            <tr>
              <td className="name-column">Nom</td>
              <td className="role-column">Rôle</td>
              <td className="empty-column"></td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="name-column">{user.name}</td>
                <td className="role-column">{user.role}</td>
                <td className="empty-column">
                  <button onClick={() => deleteAUser(user._id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th colSpan={3}>Publications</th>
            </tr>
            <tr>
              <td className="name-column">Utilisateur</td>
              <td className="role-column">Contenu</td>
              <td className="empty-column"></td>
            </tr>
          </thead>
          <tbody>
          {posts.map((post) => (
              <tr key={post._id}>
                <td className="name-column">{post.userName}</td>
                <td className="role-column">{post.message}</td>
                <td className="empty-column">
                  <button onClick={() => deletePost(post._id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Admin;
