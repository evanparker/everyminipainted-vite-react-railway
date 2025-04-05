import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { putPassword } from "../../services/auth";
import { Button, Label, TextInput } from "flowbite-react";
import { toast } from "react-toastify/unstyled";
import { getUserByMe } from "../../services/user";
import SaveToast from "../toasts/saveToast";

const PasswordForm = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSelfData = async () => {
      const selfData = await getUserByMe();
      setUsername(selfData.username);
    };

    fetchSelfData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("before?");
    const userData = await putPassword({ password });
    console.log("after?", userData);
    if (userData) {
      toast(SaveToast, {
        data: {
          message: `Password for ${username} updated.`,
        },
      });
      navigate(`/users/${username}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
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
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default PasswordForm;
