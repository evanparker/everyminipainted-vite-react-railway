import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useUserData from "../../useUserData";
import DragAndDrop from "../images/DragAndDrop";
import { getMini, putMini } from "../../services/mini";
import { postImage } from "../../services/image";
import { Button, HR, Label, TextInput } from "flowbite-react";
import CldThumbnailImage from "../images/CldThumbnailImage";
import { BsFillTrash3Fill } from "react-icons/bs";

const MiniEdit = () => {
  const [mini, setMini] = useState();
  const { token, userId } = useUserData();
  const { id } = useParams();
  const navigate = useNavigate();
  const dragImage = useRef(0);
  const draggedOverImage = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      const miniData = await getMini(id);
      setMini(miniData);
    };
    fetchData();
  }, [id]);

  const handleSort = () => {
    const imagesClone = [...mini.images];
    const temp = imagesClone[dragImage.current];
    imagesClone[dragImage.current] = imagesClone[draggedOverImage.current];
    imagesClone[draggedOverImage.current] = temp;
    setMini({ ...mini, images: imagesClone });
  };

  const handleDelete = (index) => {
    const imagesClone = mini.images;
    imagesClone.splice(index,1);
    setMini({ ...mini, images: imagesClone });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const miniData = await putMini(mini._id, mini);
    setMini({ ...miniData, images: mini.images });
    navigate(`/minis/${id}`);
  };

  const addImages = async (publicIds) => {
    let images = mini.images;
    for (let publicId of publicIds) {
      const newImage = await postImage({ cloudinaryPublicId: publicId });
      images = [newImage, ...images];
    }
    setMini((prevMini) => ({ ...prevMini, images }));
  };

  const handleNameChange = (e) => {
    e.preventDefault();
    setMini((prevMini) => ({ ...prevMini, name: e.target.value }));
  };

  return (
    <>
      {mini && token && userId === mini?.userId && (
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
                value={mini.name}
                onChange={handleNameChange}
              />
            </div>
            <DragAndDrop addImages={addImages} />

            <Button type="submit">Save</Button>
          </form>
          <HR />
          <div>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              {mini?.name || "Untitled Mini"}
            </h1>
            <div className="mt-5 flex flex-wrap gap-4">
              {mini?.images?.map((img, index) => (
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
                  <CldThumbnailImage publicId={img.cloudinaryPublicId}  width={400} height={400}/>
                </div>
              ))}
            </div>
          </div>
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

export default MiniEdit;
