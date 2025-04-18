import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getManufacturer,
  postManufacturer,
  putManufacturer,
} from "../../services/manufacturer";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { getUserByMe } from "../../services/user";
import ImageSortContainer from "../images/imageSortContainer";
import SocialsForm from "../socialsForm";
import { toast } from "react-toastify/unstyled";
import SaveToast from "../toasts/saveToast";
import S3DragAndDrop from "../images/s3DragAndDrop";

const ManufacturerForm = ({ mode }) => {
  const [manufacturer, setManufacturer] = useState({ name: "", images: [] });
  const [isAdmin, setIsAdmin] = useState(false);
  const [socials, setSocials] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleSort = (position1, position2) => {
    const imagesClone = [...manufacturer.images];
    const temp = imagesClone[position1];
    imagesClone[position1] = imagesClone[position2];
    imagesClone[position2] = temp;
    setManufacturer({ ...manufacturer, images: imagesClone });
  };

  const handleDelete = (index) => {
    const imagesClone = manufacturer.images;
    const removedImages = imagesClone.splice(index, 1);
    const newManufacturerObject = { ...manufacturer, images: imagesClone };
    if (removedImages[0]?._id === manufacturer.thumbnail._id) {
      newManufacturerObject.thumbnail = imagesClone[0];
    }
    setManufacturer(newManufacturerObject);
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

  const addImages = async (newImages) => {
    let images = manufacturer.images;
    images = [...newImages, ...images];
    setManufacturer((prevManufacturer) => ({
      ...prevManufacturer,
      images,
      thumbnail: prevManufacturer.thumbnail || images[0],
    }));
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
                required={true}
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
                <S3DragAndDrop addImages={addImages} />
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
