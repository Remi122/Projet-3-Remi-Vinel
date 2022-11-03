import { Outlet } from "react-router-dom";
import GroupomaniaHeader from "../components/GroupomaniaHeader";

const Groupomania = () => {
  return (
    <>
      <GroupomaniaHeader />
      <Outlet />
    </>
  );
};

export default Groupomania;
