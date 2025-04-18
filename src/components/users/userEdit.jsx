import { useEffect, useState, useRef } from "react";
import { getUserByMe, putUser } from "../../services/user";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./userAvatar";
import SocialsForm from "../socialsForm";
import { toast } from "react-toastify/unstyled";
import SaveToast from "../toasts/saveToast";
import S3DragAndDrop from "../images/s3DragAndDrop";
import Croppie from "croppie";
import "croppie/croppie.css";
import getS3Url from "../images/getS3Url";
import { postImage } from "../../services/image";

const UserEdit = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [socials, setSocials] = useState([]);
  const [croppie, setCroppie] = useState(null);
  const [croppieImage, setCroppieImage] = useState("");
  const abortControllerRef = useRef(new AbortController());

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
    const url = getS3Url({
      key: newImage.s3Key,
      bucket: newImage.s3Bucket,
      options: "width:800",
      extension: "png",
    });
    setCroppieImage(url);
    const el = document.getElementById("croppie-image-helper");
    if (el) {
      const croppieInstance = new Croppie(el, {
        enableExif: true,
        viewport: {
          height: 200,
          width: 200,
          type: "circle",
        },
        boundary: {
          height: 300,
          width: 300,
        },
        mouseWheelZoom: false,
      });
      croppieInstance.bind({
        url: url,
      });
      setCroppie(croppieInstance);
    }
  };

  const handleCropButton = (e) => {
    e.preventDefault();

    if (croppie !== null) {
      croppie
        .result({
          type: "blob",
          size: {
            width: 480,
            height: 480,
          },
        })
        .then(async (blob) => {
          // Save image to backend
          const file = new File([blob], "image.png", {
            type: "image/png",
            lastModified: new Date().getTime(),
          });

          abortControllerRef.current.abort();
          abortControllerRef.current = new AbortController();
          try {
            const image = await postImage(
              file,
              abortControllerRef.current.signal
            );

            setUser((prevUser) => ({ ...prevUser, avatar: image }));
            setCroppieImage("");
            croppie.destroy();
          } catch (error) {
            if (error.name !== "AbortError") {
              console.error(error);
            }
          }
        });
    }
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
                <div className="grow">
                  <S3DragAndDrop addImages={addImages} />
                </div>
                <div className="h-16 w-20 mb-3">
                  <UserAvatar user={user} isLink={false} showText={false} />
                </div>
              </div>
              <div
                className={
                  croppieImage
                    ? "mt-3 flex flex-col gap-5 rounded-lg border-2 border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 p-5"
                    : ""
                }
              >
                <div id="croppie-image-helper" />
                {croppieImage && (
                  <Button
                    className="w-40 self-center"
                    onClick={handleCropButton}
                  >
                    Crop
                  </Button>
                )}
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
