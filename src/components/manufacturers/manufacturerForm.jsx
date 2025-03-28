import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CldDragAndDrop from "../images/CldDragAndDrop";
import {
  getManufacturer,
  postManufacturer,
  putManufacturer,
} from "../../services/manufacturer";
import { postImage } from "../../services/image";
import { Button, Label, TextInput } from "flowbite-react";
import { getUserByMe } from "../../services/user";
import ImageSortContainer from "../images/imageSortContainer";

const ManufacturerForm = ({ mode }) => {
  const [manufacturer, setManufacturer] = useState({ name: "", images: [] });
  const [isAdmin, setIsAdmin] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dragImage = useRef(0);
  const draggedOverImage = useRef(0);

  useEffect(() => {
    const fetchManufacturerData = async () => {
      const manufacturerData = await getManufacturer(id);
      setManufacturer(manufacturerData);
    };
    const fetchSelfData = async () => {
      const selfData = await getUserByMe();
      if (selfData.roles.includes("admin")) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let manufacturerData;
    if (mode === "edit") {
      manufacturerData = await putManufacturer(manufacturer._id, manufacturer);
    } else if (mode === "new") {
      manufacturerData = await postManufacturer(manufacturer);
    }
    if (manufacturerData) {
      navigate(`/manufacturers/${id? id : ""}`);
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

  return (
    <>
      {manufacturer && isAdmin && (
        <div>
          <form
            onSubmit={handleSubmit}
            className="max-w-lg flex flex-col gap-5"
          >
            <div className=" mb-2 block">
              <Label htmlFor="name1">Name</Label>
              <TextInput
                id="name1"
                type="text"
                value={manufacturer.name}
                onChange={handleNameChange}
              />
            </div>

            <div className="mb-2 block">
              <Label htmlFor="images1">Images</Label>

              <CldDragAndDrop addImages={addImages} />

              <div className="mt-5">
                <ImageSortContainer
                  onSort={handleSort}
                  onDelete={handleDelete}
                  images={manufacturer.images}
                />
              </div>
            </div>
            <Button type="submit">Save</Button>
          </form>
        </div>
      )}
    </>
  );
};

export default ManufacturerForm;
