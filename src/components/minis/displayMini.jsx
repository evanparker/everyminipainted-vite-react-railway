import CldThumbnailImage from "../images/CldThumbnailImage";
import PropTypes from "prop-types";
import ImageModal from "../images/imageModal";
import { useState } from "react";

const DisplayMini = ({ mini }) => {

  const [selectedImage, setSelectedImage] = useState();

  const onClose = () => {
    setSelectedImage(undefined);
  }

  return (
    <>
      <ImageModal onClose={onClose} image={selectedImage} show={!!selectedImage} />
      <div>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{mini?.name || "Untitled Mini"}</h1>
        <div className="mt-5 flex flex-wrap gap-4">
          {mini?.images?.map((img) => (
            <div key={img._id} onClick={()=>setSelectedImage(img)} className="cursor-pointer max-w-md flex rounded-lg border overflow-hidden border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
              <CldThumbnailImage publicId={img.cloudinaryPublicId} width={400} height={400} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

DisplayMini.propTypes = {
  mini: PropTypes.object,
};

export default DisplayMini;
