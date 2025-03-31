import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CldDragAndDrop from "../images/CldDragAndDrop";
import {
  getManufacturer,
  postManufacturer,
  putManufacturer,
} from "../../services/manufacturer";
import { postImage } from "../../services/image";
import {
  Button,
  Dropdown,
  DropdownItem,
  Label,
  Textarea,
  TextInput,
} from "flowbite-react";
import { getUserByMe } from "../../services/user";
import ImageSortContainer from "../images/imageSortContainer";
import {
  FaTrash,
} from "react-icons/fa";
import Socials from "../../constants/socials";


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
      manufacturerData = await putManufacturer(manufacturer._id, {
        ...manufacturer,
        socials,
      });
    } else if (mode === "new") {
      manufacturerData = await postManufacturer({ ...manufacturer, socials });
    }
    if (manufacturerData) {
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

  const addSocialField = (social) => {
    setSocials((prevSocials) => [
      ...prevSocials,
      { service: social.service, link: "" },
    ]);
    console.log(socials);
  };

  const deleteSocialField = (index) => {
    setSocials((prevSocials) => [
      ...prevSocials.filter((value, i) => index !== i),
    ]);
  };

  const handleSocialFieldChange = (e, social, index) => {
    setSocials((prevSocials) => {
      const socialsCopy = [...prevSocials];
      socialsCopy[index] = { service: social.service, link: e.target.value };
      return socialsCopy;
    });
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

            <div className="block max-w-lg">
              <Label>Socials</Label>

              <Dropdown
                id="socials-dropdown-button"
                className="mb-2 shadow-md"
                label="Add Social"
              >
                {Object.keys(Socials).map((social) => (
                  <div key={Socials[social].service}>
                    <DropdownItem
                      key={social.service}
                      onClick={() => addSocialField(Socials[social])}
                      icon={Socials[social].icon}
                    >
                      {Socials[social].name}
                    </DropdownItem>
                  </div>
                ))}
              </Dropdown>

              <div className="flex flex-col gap-2">
                {socials?.map((social, index) => (
                  <div className="flex gap-2" key={`socials${index}`}>
                    <TextInput
                      icon={Socials[social.service].icon}
                      type="search"
                      id={`socials${index}`}
                      key={`socials${index}`}
                      className="grow-1"
                      placeholder=""
                      value={social.link}
                      onChange={(e) =>
                        handleSocialFieldChange(e, social, index)
                      }
                    />
                    <div
                      onClick={() => deleteSocialField(index)}
                      className=" p-3 rounded-md cursor-pointer text-gray-500 hover:text-gray-800 bg-gray-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:text-gray-200"
                    >
                      <FaTrash />
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
