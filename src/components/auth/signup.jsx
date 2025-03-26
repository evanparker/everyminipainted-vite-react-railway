import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSignup } from "../../services/auth";
import { Button, Label, TextInput } from "flowbite-react";

const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [invite, setInvite] = useState();
  const [username, setUsername] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await postSignup({
      username,
      email,
      password,
      invite
    });
    if (userData) {
      navigate("/login");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      <div>
          <div className="mb-2 block">
            <Label htmlFor="username1" >Username</Label>
          </div>
          <TextInput
            id="username1"
            type="text"
            required
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" >Password</Label>
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
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Signup;
