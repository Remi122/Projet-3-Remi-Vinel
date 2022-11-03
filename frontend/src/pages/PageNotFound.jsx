import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <>
      <div>404 Page not found</div>

      <p>
        <Link to="/groupomania">Retour sur Groupomania</Link>
      </p>
    </>
  );
};

export default PageNotFound;
