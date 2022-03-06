import { useContext } from "react";
import HeaderComponent from "../components/HeaderComponent";
import { AuthContext } from "../providers/AuthContext";

const DefaultPage = () => {
  const auth = useContext(AuthContext);
  return (
    <>
      <HeaderComponent isAuthenticated={auth.isAuthenticated}></HeaderComponent>
    </>
  );
};

export default DefaultPage;
