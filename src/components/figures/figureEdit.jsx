import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DragAndDrop from "../images/DragAndDrop";
import { getFigure, putFigure } from "../../services/figure";
import { postImage } from "../../services/image";
import { Button, HR, Label, TextInput } from "flowbite-react";
import CldThumbnailImage from "../images/CldThumbnailImage";
import { BsFillTrash3Fill } from "react-icons/bs";
import { getUserByMe } from "../../services/user";

const FigureEdit = () => {
  const [figure, setFigure] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dragImage = useRef(0);
  const draggedOverImage = useRef(0);

  useEffect(() => {
    const fetchFigureData = async () => {
      const figureData = await getFigure(id);
      setFigure(figureData);
    };
    const fetchSelfData = async () => {
      const selfData = await getUserByMe();
      if(selfData.roles.includes("admin")) {
        setIsAdmin(true);
      }
    };
    
    fetchFigureData();
    fetchSelfData();
  }, [id]);

  const handleSort = () => {
    const imagesClone = [...figure.images];
    const temp = imagesClone[dragImage.current];
    imagesClone[dragImage.current] = imagesClone[draggedOverImage.current];
    imagesClone[draggedOverImage.current] = temp;
    setFigure({ ...figure, images: imagesClone });
  };

  const handleDelete = (index) => {
    const imagesClone = figure.images;
    imagesClone.splice(index,1);
    setFigure({ ...figure, images: imagesClone });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const figureData = await putFigure(figure._id, figure);
    setFigure({ ...figureData, images: figure.images });
    navigate(`/figures/${id}`);
  };

  const addImages = async (publicIds) => {
    let images = figure.images;
    for (let publicId of publicIds) {
      const newImage = await postImage({ cloudinaryPublicId: publicId });
      images = [newImage, ...images];
    }
    setFigure((prevFigure) => ({ ...prevFigure, images }));
  };

  const handleNameChange = (e) => {
    e.preventDefault();
    setFigure((prevFigure) => ({ ...prevFigure, name: e.target.value }));
  };

  return (
    <>
      {figure && isAdmin && (
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
                value={figure.name}
                onChange={handleNameChange}
              />
            </div>
            <DragAndDrop addImages={addImages} />

            <Button type="submit">Save</Button>
          </form>
          <HR />
          <div>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              {figure?.name || "Untitled Figure"}
            </h1>
            <div className="mt-5 flex flex-wrap gap-4">
              {figure?.images?.map((img, index) => (
                <div
                  draggable
                  onDragStart={() => (dragImage.current = index)}
                  onDragEnter={() => (draggedOverImage.current = index)}
                  onDragEnd={handleSort}
                  onDragOver={(e) => e.preventDefault()}
                  key={img._id}
                  className="relative cursor-move max-w-md flex rounded-lg border overflow-hidden border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <div onClick={()=> handleDelete(index)} className="absolute right-2 top-2 p-2 cursor-pointer text-gray-500 hover:text-gray-800 bg-gray-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:text-gray-200">
                    <BsFillTrash3Fill className=""/>
                  </div>
                  <CldThumbnailImage publicId={img.cloudinaryPublicId} width={400} height={400} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FigureEdit;
