import { useEffect, useState } from "react";
import { postForgotPassword } from "../../services/auth";
import { Button, Label, TextInput } from "flowbite-react";
import { toast } from "react-toastify/unstyled";
import ForgotPasswordToast from "../toasts/forgotPasswordToast";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await postForgotPassword({ email });
      if (data) {
        toast(ForgotPasswordToast, {
          data: {
            message: `Forgot password email sent to ${email}`,
          },
        });
        navigate(`/login`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1">Email Address</Label>
          </div>
          <TextInput
            id="email1"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
