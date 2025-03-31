import { useEffect, useState } from "react";
import { getUserByMe, putUser } from "../../services/user";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import CldDragAndDrop from "../images/CldDragAndDrop";
import { postImage } from "../../services/image";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./userAvatar";
import SocialsForm from "../socialsForm";

const UserEdit = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserByMe();
      setUser(userData);
      setSocials(userData.socials);
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseData = await putUser(user._id, { ...user, socials });
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

  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setUser((prevUser) => ({
      ...prevUser,
      description: e.target.value,
    }));
  };

  const handleWebsiteChange = (e) => {
    e.preventDefault();
    setUser((prevUser) => ({
      ...prevUser,
      website: e.target.value,
    }));
  };

  return (
    <>
      {user && (
        <>
          <div className="mb-5">
            <UserAvatar user={user} />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="max-w-lg">
              <Label htmlFor="email1">Email</Label>
              <TextInput
                id="email1"
                type="text"
                value={user?.email}
                onChange={handleEmailChange}
              />
            </div>

            <div className="block max-w-lg">
              <Label htmlFor="description1">Description</Label>
              <Textarea
                id="description1"
                rows={4}
                onChange={handleDescriptionChange}
                value={user.description}
              />
            </div>

            <div className="max-w-lg">
              <Label htmlFor="website1">Website</Label>
              <TextInput
                id="website1"
                type="text"
                onChange={handleWebsiteChange}
                value={user?.website}
              />
            </div>

            <div className="max-w-lg">
              <SocialsForm socials={socials} setSocials={setSocials} />
            </div>

            <div className="max-w-lg">
              <Label htmlFor="images1">Profile Image</Label>
              <CldDragAndDrop addImages={addImages} />
            </div>
            <div className="max-w-lg">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default UserEdit;
