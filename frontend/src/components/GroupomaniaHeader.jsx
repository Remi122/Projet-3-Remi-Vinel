import GroupomaniaNavigation from "./GroupomaniaNavigation";
import useAuth from "../hooks/useAuth";

const GroupomaniaHeader = () => {
  const { auth } = useAuth();

  return (
    <>
      <header>
        <div className="block-logo">
          <img src="./images/groupomania-icon.png" alt="groupomania-icon" />
        </div>
        <div className="block-title">
          <h1>Groupomania</h1>
        </div>
        <div className="header-info">
          <div className="block-userid">
            <p>{auth.userName}</p>
            <p>{auth.role}</p>
          </div>
          <GroupomaniaNavigation />
        </div>
      </header>
    </>
  );
};

export default GroupomaniaHeader;
