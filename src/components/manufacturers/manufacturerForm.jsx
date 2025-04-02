import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CldDragAndDrop from "../images/CldDragAndDrop";
import {
  getManufacturer,
  postManufacturer,
  putManufacturer,
} from "../../services/manufacturer";
import { postImage } from "../../services/image";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { getUserByMe } from "../../services/user";
import ImageSortContainer from "../images/imageSortContainer";
import SocialsForm from "../socialsForm";
import { toast } from "react-toastify/unstyled";
import SaveToast from "../toasts/saveToast";

const ManufacturerForm = ({ mode }) => {
  const [manufacturer, setManufacturer] = useState({ name: "", images: [] });
  const [isAdmin, setIsAdmin] = useState(false);
  const [socials, setSocials] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const dragImage = useRef(0);
  const draggedOverImage = useRef(0);

  useEffect(() => {
    const fetchManufacturerData = async () => {
      const manufacturerData = await getManufacturer(id);
      setManufacturer(manufacturerData);
      setSocials(manufacturerData.socials);
    };
    const fetchSelfData = async () => {
      const selfData = await getUserByMe();
      if (selfData?.roles?.includes("admin")) {
        setIsAdmin(true);
      }
    };

    if (mode === "edit") {
      fetchManufacturerData();
    }
    fetchSelfData();
  }, [mode, id]);

  const handleSort = () => {
    const imagesClone = [...manufacturer.images];
    const temp = imagesClone[dragImage.current];
    imagesClone[dragImage.current] = imagesClone[draggedOverImage.current];
    imagesClone[draggedOverImage.current] = temp;
    setManufacturer({ ...manufacturer, images: imagesClone });
  };

  const handleDelete = (index) => {
    const imagesClone = manufacturer.images;
    imagesClone.splice(index, 1);
    setManufacturer({ ...manufacturer, images: imagesClone });
  };

  const handleSetThumbnail = (id) => {
    setManufacturer((prevManufacturer) => ({
      ...prevManufacturer,
      thumbnail: id,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let manufacturerData;
    if (mode === "edit") {
      manufacturerData = await putManufacturer(manufacturer._id, {
        ...manufacturer,
        socials,
      });
    } else if (mode === "new") {
      manufacturerData = await postManufacturer({ ...manufacturer, socials });
    }
    if (manufacturerData) {
      toast(SaveToast, {
        data: {
          message: `${manufacturer.name} Saved.`,
        },
      });
      navigate(`/manufacturers/${id || manufacturerData._id || ""}`);
    }
  };

  const addImages = async (publicIds) => {
    let images = manufacturer.images;
    for (const publicId of publicIds) {
      const newImage = await postImage({ cloudinaryPublicId: publicId });
      images = [newImage, ...images];
    }
    setManufacturer((prevManufacturer) => ({ ...prevManufacturer, images }));
  };

  const handleNameChange = (e) => {
    e.preventDefault();
    setManufacturer((prevManufacturer) => ({
      ...prevManufacturer,
      name: e.target.value,
    }));
  };

  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setManufacturer((prevManufacturer) => ({
      ...prevManufacturer,
      description: e.target.value,
    }));
  };

  const handleWebsiteChange = (e) => {
    e.preventDefault();
    setManufacturer((prevManufacturer) => ({
      ...prevManufacturer,
      website: e.target.value,
    }));
  };

  return (
    <>
      {manufacturer && isAdmin && (
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="block max-w-lg">
              <Label htmlFor="name1">Name</Label>
              <TextInput
                id="name1"
                type="text"
                value={manufacturer.name}
                onChange={handleNameChange}
              />
            </div>

            <div className="block max-w-lg">
              <Label htmlFor="description1">Description</Label>
              <Textarea
                id="description1"
                rows={4}
                onChange={handleDescriptionChange}
                value={manufacturer.description}
              />
            </div>

            <div className="block max-w-lg">
              <Label htmlFor="website1">Website</Label>
              <TextInput
                id="website1"
                type="text"
                onChange={handleWebsiteChange}
                value={manufacturer.website}
              />
            </div>

            <SocialsForm socials={socials} setSocials={setSocials} />

            <div className="block">
              <div className="block max-w-lg">
                <Label htmlFor="images1">Images</Label>
                <CldDragAndDrop addImages={addImages} />
              </div>

              <div className="mt-5">
                <ImageSortContainer
                  onSort={handleSort}
                  onDelete={handleDelete}
                  images={manufacturer.images}
                  thumbnail={manufacturer.thumbnail}
                  onSetThumbnail={handleSetThumbnail}
                />
              </div>
            </div>

            <div className="block max-w-lg">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ManufacturerForm;
