import CldThumbnailImage from "../images/CldThumbnailImage";
import PropTypes from "prop-types";
import ImageModal from "../images/imageModal";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import S3Image from "../images/s3Image";

const DisplayMini = ({ mini }) => {
  const [selectedImage, setSelectedImage] = useState();

  const onClose = () => {
    setSelectedImage(undefined);
  };

  const onArrowKeyDown = useCallback(
    (e) => {
      if (selectedImage) {
        const index = mini.images.indexOf(selectedImage);

        if (e.key === "ArrowLeft") {
          setSelectedImage(mini.images[Math.max(0, index - 1)]);
        } else if (e.key === "ArrowRight") {
          setSelectedImage(
            mini.images[Math.min(mini.images.length - 1, index + 1)]
          );
        }
      }
    },
    [selectedImage, mini.images]
  );

  useEffect(() => {
    document.addEventListener("keydown", onArrowKeyDown, false);
    return () => {
      document.removeEventListener("keydown", onArrowKeyDown, false);
    };
  });

  return (
    <>
      <ImageModal
        onClose={onClose}
        image={selectedImage}
        show={!!selectedImage}
      />
      <div>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          {mini?.name || "Untitled Mini"}
        </h1>
        <div className="format dark:format-invert">
          <Markdown>{mini?.description}</Markdown>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {mini?.images?.map((img) => (
            <div
              key={img._id}
              onClick={() => setSelectedImage(img)}
              className="cursor-pointer max-w-md flex rounded-lg border overflow-hidden border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              {img.type === "s3Image" ? (
                <S3Image image={img} width={400} height={400} />
              ) : (
                <CldThumbnailImage
                  publicId={img.cloudinaryPublicId}
                  width={400}
                  height={400}
                />
              )}
            </div>
          ))}
        </div>
        {mini.figure && (
          <Link to={`/figures/${mini.figure._id}`}>
            <div className="mt-5 p-3 cursor-pointer max-w-md rounded-lg border overflow-hidden border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white">
              <div className="mb-1 text-xs text-gray-600 dark:text-gray-400">
                Figure:
              </div>
              {mini.figure.name}
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

DisplayMini.propTypes = {
  mini: PropTypes.object,
};

export default DisplayMini;
