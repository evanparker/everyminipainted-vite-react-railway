import { Button } from "flowbite-react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../userContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <Button type="submit">Logout</Button>
        </form>
      </div>
    </>
  );
};

Logout.propTypes = {
  resetUserData: PropTypes.func.isRequired,
  token: PropTypes.string,
};

export default Logout;
