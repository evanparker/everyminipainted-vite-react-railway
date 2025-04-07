import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../../services/auth";
import { Button, HelperText, Label, TextInput } from "flowbite-react";
import LogoutToast from "../toasts/logoutToast";
import { toast } from "react-toastify/unstyled";

const Login = ({ setUserData }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorText, setErrorText] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorText();
    try {
      const userData = await postLogin({
        email,
        password,
      });
      setUserData(userData);
      toast(LogoutToast, {
        data: {
          message: `Logged in as ${email}.`,
        },
      });
      navigate("/");
    } catch (error) {
      if (error.status === 401) {
        setErrorText("Invalid username or password.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1">Email</Label>
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@flowbite.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">Password</Label>
          </div>
          <TextInput
            id="password1"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <HelperText color="failure">{errorText}</HelperText>
          <HelperText>
            <Link
              to="/forgotpassword"
              className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
            >
              Forgot Password?
            </Link>
          </HelperText>
        </div>
        {/* <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div> */}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

Login.propTypes = {
  setUserData: PropTypes.func.isRequired,
};

export default Login;
