import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import DataContext from "../context/DataContext";
import { useContext } from "react";
import useAuth from "../hooks/useAuth";
import { FaArrowLeft } from "react-icons/fa";

const GroupomaniaNavigation = () => {
  const { auth } = useAuth();
  const { disconnect, ROLES } = useContext(DataContext);

  const page = window.location.href;
  const url = new URL(page);
  const pagePath = url.pathname;

  return (
    <nav className="block-navigation">
      {auth.role === ROLES.Admin && pagePath === "/groupomania" ? (
        <button>
          <Link to="/groupomania/admin">
            <GrUserAdmin /> Admin
          </Link>
        </button>
      ) : pagePath === "/groupomania/admin" ? (
        <button>
          <Link to="/groupomania">
            <FaArrowLeft /> Retour
          </Link>
        </button>
      ) : null}

      <button onClick={disconnect}>
        <MdLogout /> Déconnexion
      </button>
    </nav>
  );
};

export default GroupomaniaNavigation;
