import { Link } from "react-router-dom";

const NewAccountBtn = () => {
  return (
    <Link className="color-nav main-button" to="/signup">
      Créer un nouveau compte ?
    </Link>
  );
};

export default NewAccountBtn;
