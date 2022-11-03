import { Routes, Route } from "react-router-dom";
import { useEffect , useContext } from "react";
import DataContext from "./context/DataContext";

import RequireAuth from "./components/RequireAuth";
import PageNotFound from "./pages/PageNotFound";
import LandingPage from "./pages/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Groupomania from "./pages/Groupomania";
import Admin from "./components/Admin";
import DiscussionFeed from "./components/DiscussionFeed";
import NewPost from "./components/NewPost";
import PostUpdate from "./components/PostUpdate";
import PostDelete from "./components/PostDelete";

const App = () => {
  const { setAuth, navigate, ROLES } = useContext(DataContext);
  useEffect(() => {
    if (sessionStorage.getItem("groupomaniaId")) {
      const myAuth = JSON.parse(sessionStorage.getItem("groupomaniaId"));
      setAuth({
        userId: myAuth.userId,
        userName: myAuth.userName,
        role: myAuth.role,
        accessToken: myAuth.accessToken,
      });
      navigate("/groupomania");
    } else navigate("/");
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route
          element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
        >
          <Route path="/groupomania" element={<Groupomania />}>
            <Route element={<DiscussionFeed />}>
              <Route index element={<NewPost />} />
              <Route path=":id" element={<PostUpdate />} />
            </Route>
            <Route path="delete/:id" element={<PostDelete />} />
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="admin" element={<Admin />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
