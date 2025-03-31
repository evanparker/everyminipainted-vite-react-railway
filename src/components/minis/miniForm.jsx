import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useUserData from "../../useUserData";
import CldDragAndDrop from "../images/CldDragAndDrop";
import { getMini, postMini, putMini } from "../../services/mini";
import { postImage } from "../../services/image";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { getFiguresBySearch } from "../../services/figure";
import ImageSortContainer from "../images/imageSortContainer";

const MiniForm = ({ mode }) => {
  const [mini, setMini] = useState({ name: "", images: [] });
  const [figureSearch, setFigureSearch] = useState("");
  const [figureResults, setFigureResults] = useState([]);
  const [selectedFigure, setSelectedFigure] = useState();
  const [figureDropdownOpen, setFigureDropdownOpen] = useState(false);
  const { token, userId } = useUserData();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const miniData = await getMini(id);
      setMini(miniData);
      setSelectedFigure(miniData.figure);
    };
    if (mode === "edit") {
      fetchData();
    }
  }, [mode, id]);

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

  const handleSubmit = async (e) => {
    let miniData;
    e.preventDefault();
    if (mode === "edit") {
      miniData = await putMini(mini._id, {
        ...mini,
        figure: selectedFigure,
      });
    } else if (mode === "new") {
      miniData = await postMini({
        ...mini,
        figure: selectedFigure,
      });
    }
    if (miniData) {
      navigate(`/minis/${id || miniData?._id || ""}`);
    }
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
    setMini((prevMini) => ({ ...prevMini, name: e.target.value }));
  };

  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setMini((prevMini) => ({ ...prevMini, description: e.target.value }));
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
      {mini && token && (userId === mini?.userId?._id || mode === "new") && (
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="max-w-lg block">
              <Label htmlFor="name1">Name</Label>
              <TextInput
                id="name1"
                type="text"
                value={mini.name}
                onChange={handleNameChange}
              />
            </div>

            <div className="block max-w-lg">
              <Label htmlFor="description1">Description</Label>
              <Textarea
                id="description1"
                rows={4}
                onChange={handleDescriptionChange}
                value={mini.description}
              />
            </div>

            <div className="max-w-lg block">
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

            <div className="block">
              <div className="max-w-lg">
                <Label htmlFor="images1">Images</Label>
                <CldDragAndDrop addImages={addImages} />
              </div>
              <div className="mt-5">
                <ImageSortContainer
                  onSort={handleSort}
                  onDelete={handleDelete}
                  images={mini.images}
                />
              </div>
            </div>
            <Button type="submit" className="max-w-lg">
              Save
            </Button>
          </form>
        </div>
      )}
      {mini && userId !== mini?.userId && (
        <Link to={`/minis/${id}`}>Back to mini</Link>
      )}
      {!token && (
        <Button as={Link} to={`/login`}>
          Login?
        </Button>
      )}
    </>
  );
};

export default MiniForm;
