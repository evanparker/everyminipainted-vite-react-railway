import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserData from "../../useUserData";
import CldDragAndDrop from "../images/CldDragAndDrop";
import { postMini } from "../../services/mini";
import { postImage } from "../../services/image";
import { Button, Label, TextInput } from "flowbite-react";
import { getFiguresBySearch } from "../../services/figure";
import ImageSortContainer from "../images/imageSortContainer";

const MiniNew = () => {
  const [mini, setMini] = useState({ name: "", images: [] });
  const [figureSearch, setFigureSearch] = useState("");
  const [figureResults, setFigureResults] = useState([]);
  const [selectedFigure, setSelectedFigure] = useState();
  const [figureDropdownOpen, setFigureDropdownOpen] = useState(false);

  const { token } = useUserData();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const miniData = await postMini({ ...mini, figure: selectedFigure });
    navigate(`/minis/${miniData._id}`);
  };

  const handleSort = (position1, position2) => {
    const imagesClone = [...mini.images];
    const temp = imagesClone[position1];
    imagesClone[position1] = imagesClone[position2];
    imagesClone[position2] = temp;
    setMini({ ...mini, images: imagesClone });
  };

  const handleDelete = (index) => {
    const imagesClone = mini.images;
    imagesClone.splice(index, 1);
    setMini({ ...mini, images: imagesClone });
  };

  const addImages = async (publicIds) => {
    let images = mini.images;
    for (const publicId of publicIds) {
      const newImage = await postImage({ cloudinaryPublicId: publicId });
      images = [newImage, ...images];
    }
    setMini((prevMini) => ({ ...prevMini, images }));
  };

  const handleNameChange = (e) => {
    e.preventDefault();
    setMini({ ...mini, name: e.target.value });
  };

  const chooseFigure = (figure) => {
    setSelectedFigure(figure);
    setFigureSearch(figure?.name || "");
    setFigureDropdownOpen(false);
  };

  const handleFigureSearchChange = async (e) => {
    e.preventDefault();
    setFigureSearch(e.target.value);
    const figures = await getFiguresBySearch(e.target.value);
    setFigureDropdownOpen(true);
    setFigureResults(figures);
  };

  return (
    <>
      {token && (
        <div>
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            New Mini
          </h1>
          <form
            onSubmit={handleSubmit}
            className="max-w-lg flex flex-col gap-5"
          >
            <div className="mb-2 block">
              <Label htmlFor="name1">Name</Label>
              <TextInput
                id="name1"
                type="text"
                value={mini.name}
                onChange={handleNameChange}
              />
            </div>

            <div className="mb-2 block">
              <Label htmlFor="figure1">Figure</Label>
              {selectedFigure && (
                <div className="dark:text-white">{selectedFigure.name}</div>
              )}
              <TextInput
                id="figure1"
                type="text"
                value={figureSearch}
                onChange={handleFigureSearchChange}
                onFocus={handleFigureSearchChange}
              />
              {figureDropdownOpen && (
                <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                  <li key={"none"}>
                    <div
                      onClick={() => chooseFigure(undefined)}
                      className="w-full py-2 text-sm rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600 font-medium text-gray-900 dark:text-gray-300"
                    >
                      None
                    </div>
                  </li>
                  {figureResults.map((f) => (
                    <li key={f._id}>
                      <div
                        onClick={() => chooseFigure(f)}
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

              {mini.images.length > 0 && <div className="mt-5">
                <ImageSortContainer
                  onSort={handleSort}
                  onDelete={handleDelete}
                  images={mini.images}
                />
              </div>}
            </div>
            <Button type="submit">Save</Button>
          </form>
        </div>
      )}
      {!token && (
        <Button as={Link} to={`/login`}>
          Login?
        </Button>
      )}
    </>
  );
};

export default MiniNew;
