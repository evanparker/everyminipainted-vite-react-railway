import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSignup } from "../../services/auth";
import { Button, HelperText, Label, TextInput } from "flowbite-react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invite, setInvite] = useState("");
  const [username, setUsername] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    try {
      const userData = await postSignup({
        username: username.trim(),
        email: email.trim(),
        password,
        invite: invite.trim(),
      });
      if (userData) {
        navigate("/login");
      }
    } catch (err) {
      setFormError(err.response?.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username1">Username</Label>
          </div>
          <TextInput
            id="username1"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1">Email</Label>
          </div>
          <TextInput
            id="email1"
            type="email"
            required
            pattern="^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
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
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="invite1">Invite Code</Label>
          </div>
          <TextInput
            id="invite1"
            type="text"
            autoComplete="one-time-code"
            required
            onChange={(e) => setInvite(e.target.value)}
          />
        </div>
        {formError && <HelperText color="failure">{formError}</HelperText>}

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Signup;
