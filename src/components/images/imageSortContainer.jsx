import { useRef } from "react";
import CldThumbnailImage from "./CldThumbnailImage";
import { BsFillTrash3Fill } from "react-icons/bs";

const ImageSortContainer = ({ onSort, onDelete, images }) => {
  const dragImage = useRef(0);
  const draggedOverImage = useRef(0);

  return (
    <div className="flex flex-wrap gap-4">
      {images?.map((img, index) => (
        <div
          draggable
          onDragStart={() => (dragImage.current = index)}
          onDragEnter={() => (draggedOverImage.current = index)}
          onDragEnd={() => onSort(dragImage.current, draggedOverImage.current)}
          onDragOver={(e) => e.preventDefault()}
          key={img._id}
          className="relative cursor-move max-w-md flex rounded-lg border overflow-hidden border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          <div
            onClick={() => onDelete(index)}
            className="absolute right-2 top-2 p-2 cursor-pointer text-gray-500 hover:text-gray-800 bg-gray-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:text-gray-200"
          >
            <BsFillTrash3Fill />
          </div>
          <CldThumbnailImage
            publicId={img.cloudinaryPublicId}
            width={200}
            height={200}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageSortContainer;
