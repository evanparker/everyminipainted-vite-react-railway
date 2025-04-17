import { useEffect, useState } from "react";
import { getUserByMe, putUser } from "../../services/user";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./userAvatar";
import SocialsForm from "../socialsForm";
import { toast } from "react-toastify/unstyled";
import SaveToast from "../toasts/saveToast";
import S3DragAndDrop from "../images/s3DragAndDrop";

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
      toast(SaveToast, { data: { message: `${user.username} Saved.` } });
      navigate(`/users/${user.username}`);
    }
  };

  const addImages = async (newImages) => {
    const newImage = newImages[0];
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
          <div className="w-xs mb-5">
            <UserAvatar user={user} isLink={false} />
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
              <div className="flex gap-3">
                <div className="h-16 w-20 mb-3">
                  <UserAvatar user={user} isLink={false} showText={false} />
                </div>
                <div className="grow">
                  <S3DragAndDrop addImages={addImages} />
                </div>
              </div>
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
