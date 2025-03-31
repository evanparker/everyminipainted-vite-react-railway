import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CldDragAndDrop from "../images/CldDragAndDrop";
import { getFigure, putFigure } from "../../services/figure";
import { postImage } from "../../services/image";
import { Button, Label, TextInput } from "flowbite-react";
import { getUserByMe } from "../../services/user";
import ImageSortContainer from "../images/imageSortContainer";
import { getManufacturersBySearch } from "../../services/manufacturer";

const FigureForm = ({ mode }) => {
  const [figure, setFigure] = useState({ name: "", images: [] });
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
      if (selfData.roles.includes("admin")) {
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
          <form
            onSubmit={handleSubmit}
            className="max-w-lg flex flex-col gap-5"
          >
            <div className="mb-2 block">
              <Label htmlFor="name1">Name</Label>
              <TextInput
                id="name1"
                type="text"
                value={figure.name}
                onChange={handleNameChange}
              />
            </div>

            <div className="mb-2 block">
              <Label htmlFor="manufacturer1">Manufacturer</Label>
              {selectedManufacturer && (
                <div className="dark:text-white">
                  {selectedManufacturer.name}
                </div>
              )}
              <TextInput
                id="manufacturer1"
                type="text"
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

            <div className="mb-2 block">
              <Label htmlFor="images1">Images</Label>
              <CldDragAndDrop addImages={addImages} />

              <div className="mt-5">
                <ImageSortContainer
                  onSort={handleSort}
                  onDelete={handleDelete}
                  images={figure.images}
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

export default FigureForm;
