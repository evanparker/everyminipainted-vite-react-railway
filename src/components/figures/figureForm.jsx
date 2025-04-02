import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CldDragAndDrop from "../images/CldDragAndDrop";
import { getFigure, postFigure, putFigure } from "../../services/figure";
import { postImage } from "../../services/image";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { getUserByMe } from "../../services/user";
import ImageSortContainer from "../images/imageSortContainer";
import { getManufacturersBySearch } from "../../services/manufacturer";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { toast } from "react-toastify/unstyled";
import SaveToast from "../toasts/saveToast";

const FigureForm = ({ mode }) => {
  const [figure, setFigure] = useState({
    name: "",
    partNumber: "",
    website: "",
    description: "",
    artist: "",
    images: [],
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [manufacturerSearch, setManufacturerSearch] = useState("");
  const [manufacturerResults, setManufacturerResults] = useState();
  const [selectedManufacturer, setSelectedManufacturer] = useState();
  const [manufacturerDropdownOpen, setManufacturerDropdownOpen] =
    useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dragImage = useRef(0);
  const draggedOverImage = useRef(0);

  useEffect(() => {
    const fetchFigureData = async () => {
      const figureData = await getFigure(id);
      setSelectedManufacturer(figureData.manufacturer);
      setFigure(figureData);
    };
    const fetchSelfData = async () => {
      const selfData = await getUserByMe();
      if (selfData?.roles?.includes("admin")) {
        setIsAdmin(true);
      }
    };

    if (mode === "edit") {
      fetchFigureData();
    }
    fetchSelfData();
  }, [mode, id]);

  const handleSort = () => {
    const imagesClone = [...figure.images];
    const temp = imagesClone[dragImage.current];
    imagesClone[dragImage.current] = imagesClone[draggedOverImage.current];
    imagesClone[draggedOverImage.current] = temp;
    setFigure({ ...figure, images: imagesClone });
  };

  const handleDelete = (index) => {
    const imagesClone = figure.images;
    imagesClone.splice(index, 1);
    setFigure({ ...figure, images: imagesClone });
  };

  const handleSetThumbnail = (id) => {
    setFigure((prevFigure) => ({ ...prevFigure, thumbnail: id }));
  };

  const handleSubmit = async (e) => {
    let figureData;
    e.preventDefault();
    if (mode === "edit") {
      figureData = await putFigure(figure._id, {
        ...figure,
        manufacturer: selectedManufacturer,
      });
    } else if (mode === "new") {
      figureData = await postFigure({
        ...figure,
        manufacturer: selectedManufacturer,
      });
    }
    if (figureData) {
      toast(SaveToast, {
        data: {
          message: `${figure.name} Saved.`,
        },
      });
      navigate(`/figures/${id || figureData._id || ""}`);
    }
  };

  const addImages = async (publicIds) => {
    let images = figure.images;
    for (const publicId of publicIds) {
      const newImage = await postImage({ cloudinaryPublicId: publicId });
      images = [newImage, ...images];
    }
    setFigure((prevFigure) => ({ ...prevFigure, images }));
  };

  const handleNameChange = (e) => {
    e.preventDefault();
    setFigure((prevFigure) => ({ ...prevFigure, name: e.target.value }));
  };

  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setFigure((prevFigure) => ({ ...prevFigure, description: e.target.value }));
  };

  const handleWebsiteChange = (e) => {
    e.preventDefault();
    setFigure((prevFigure) => ({ ...prevFigure, website: e.target.value }));
  };

  const handlePartNumberChange = (e) => {
    e.preventDefault();
    setFigure((prevFigure) => ({ ...prevFigure, partNumber: e.target.value }));
  };

  const handleArtistChange = (e) => {
    e.preventDefault();
    setFigure((prevFigure) => ({ ...prevFigure, artist: e.target.value }));
  };

  const chooseManufacturer = (manufacturer) => {
    setSelectedManufacturer(manufacturer);
    setManufacturerSearch(manufacturer?.name || "");
    setManufacturerDropdownOpen(false);
  };

  const handleManufacturerSearchChange = async (e) => {
    e.preventDefault();
    setManufacturerSearch(e.target.value);
    const manufacturers = await getManufacturersBySearch(e.target.value);
    setManufacturerDropdownOpen(true);
    setManufacturerResults(manufacturers);
  };

  return (
    <>
      {figure && isAdmin && (
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="max-w-lg block">
              <Label htmlFor="name1">Name</Label>
              <TextInput
                id="name1"
                type="text"
                value={figure.name}
                onChange={handleNameChange}
              />
            </div>

            <div className="max-w-lg block">
              <Label htmlFor="partNumber1">Part Number</Label>
              <TextInput
                id="partNumber1"
                type="text"
                value={figure.partNumber}
                onChange={handlePartNumberChange}
              />
            </div>

            <div className="max-w-lg block">
              <Label htmlFor="website1">Website</Label>
              <TextInput
                id="website1"
                type="text"
                value={figure.website}
                onChange={handleWebsiteChange}
              />
            </div>

            <div className="max-w-lg block">
              <Label htmlFor="description1">Description</Label>
              <Textarea
                id="description1"
                rows={4}
                onChange={handleDescriptionChange}
                value={figure.description}
              />
            </div>

            <div className="max-w-lg block">
              <Label htmlFor="artist1">Artist</Label>
              <TextInput
                id="artist1"
                type="text"
                value={figure.artist}
                onChange={handleArtistChange}
              />
            </div>

            <div className="max-w-lg block">
              <Label htmlFor="manufacturer1">Manufacturer</Label>
              {selectedManufacturer && (
                <div className="dark:text-white">
                  {selectedManufacturer.name}
                </div>
              )}
              <TextInput
                id="manufacturer1"
                type="text"
                icon={FaMagnifyingGlass}
                value={manufacturerSearch}
                onChange={handleManufacturerSearchChange}
                onFocus={handleManufacturerSearchChange}
              />
              {manufacturerDropdownOpen && (
                <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                  <li key={"none"}>
                    <div
                      onClick={() => chooseManufacturer(undefined)}
                      className="w-full py-2 text-sm rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600 font-medium text-gray-900 dark:text-gray-300"
                    >
                      None
                    </div>
                  </li>
                  {manufacturerResults.map((f) => (
                    <li key={f._id}>
                      <div
                        onClick={() => chooseManufacturer(f)}
                        className="w-full py-2 text-sm rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600 font-medium text-gray-900 dark:text-gray-300"
                      >
                        {f.name}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="block">
              <div className="max-w-lg">
                <Label htmlFor="images1">Images</Label>
                <CldDragAndDrop addImages={addImages} />
              </div>
              <div className="mt-5">
                <ImageSortContainer
                  onSort={handleSort}
                  onDelete={handleDelete}
                  images={figure.images}
                  thumbnail={figure.thumbnail}
                  onSetThumbnail={handleSetThumbnail}
                />
              </div>
            </div>
            <div className="max-w-lg">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default FigureForm;
