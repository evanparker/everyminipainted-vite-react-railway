import { useEffect, useState } from "react";
import { getUserByMe, putUser } from "../../services/user";
import { Button, Label, TextInput } from "flowbite-react";
import DragAndDrop from "../images/DragAndDrop";
import { postImage } from "../../services/image";
import { useNavigate } from "react-router-dom";
import UserAvater from "./userAvatar";

const UserEdit = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserByMe();
      setUser(userData);
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseData = await putUser(user._id, user);
    if (responseData) {
      navigate(`/users/${user.username}`);
    }
  };

  const addImages = async (publicIds) => {
    const newImage = await postImage({ cloudinaryPublicId: publicIds[0] });
    setUser((prevUser) => ({ ...prevUser, avatar: newImage }));
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    setUser((prevUser) => ({ ...prevUser, email: e.target.value }));
  };

  return (
    <>
      {user && (
        <>
          <div>
            <UserAvater user={user} />
          </div>
          <form
            onSubmit={handleSubmit}
            className="max-w-lg flex flex-col gap-5"
          >
            <div className=" mb-2 block">
              <Label htmlFor="email1">Email</Label>
              <TextInput
                id="email1"
                type="text"
                value={user?.email}
                onChange={handleEmailChange}
              />
            </div>
            <DragAndDrop addImages={addImages} />

            <Button type="submit">Save</Button>
          </form>
        </>
      )}
    </>
  );
};

export default UserEdit;
