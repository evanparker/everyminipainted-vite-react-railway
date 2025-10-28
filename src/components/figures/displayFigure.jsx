import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import CldThumbnailImage from "../images/CldThumbnailImage";
import ImageModal from "../images/imageModal";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import S3Thumbnail from "../images/s3Thumbnail";

const DisplayFigure = ({ figure }) => {
  const [selectedImage, setSelectedImage] = useState();

  const onClose = () => {
    setSelectedImage(undefined);
  };

  const onArrowKeyDown = useCallback(
    (e) => {
      if (selectedImage) {
        const index = figure.images.indexOf(selectedImage);

        if (e.key === "ArrowLeft") {
          setSelectedImage(figure.images[Math.max(0, index - 1)]);
        } else if (e.key === "ArrowRight") {
          setSelectedImage(
            figure.images[Math.min(figure.images.length - 1, index + 1)]
          );
        }
      }
    },
    [selectedImage, figure.images]
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
          {figure?.name || "Untitled Figure"}
        </h1>
        <div className="format dark:format-invert">
          <Markdown>{figure?.description}</Markdown>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {figure?.images?.map((img) => (
            <div
              key={img._id}
              onClick={() => setSelectedImage(img)}
              className="cursor-pointer max-w-md flex flex-col rounded-lg border overflow-hidden border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              {img.type === "s3Image" ? (
                <S3Thumbnail image={img} width={400} height={400} />
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
        {figure.website && (
          <div className="max-w-md">
            <Link to={figure.website}>
              <div className="mt-5 p-3 cursor-pointer rounded-lg border overflow-hidden border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white">
                <div className="mb-1 text-xs text-gray-600 dark:text-gray-400">
                  Website:
                </div>
                {figure.website}
              </div>
            </Link>
          </div>
        )}
        {figure.partNumber && (
          <div className="max-w-md">
            <div className="mt-5 p-3 rounded-lg border overflow-hidden border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white">
              <div className="mb-1 text-xs text-gray-600 dark:text-gray-400">
                Part Number:
              </div>
              {figure.partNumber}
            </div>
          </div>
        )}
        {figure.artist && (
          <div className="max-w-md">
            <div className="mt-5 p-3 rounded-lg border overflow-hidden border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white">
              <div className="mb-1 text-xs text-gray-600 dark:text-gray-400">
                Artist:
              </div>
              {figure.artist}
            </div>
          </div>
        )}
        {figure.manufacturer && (
          <div className="max-w-md">
            <Link to={`/manufacturers/${figure.manufacturer._id}`} className="">
              <div className="mt-5 p-3 cursor-pointer rounded-lg border overflow-hidden border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white">
                <div className="mb-1 text-xs text-gray-600 dark:text-gray-400">
                  Manufacturer:
                </div>
                {figure.manufacturer.name}
              </div>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

DisplayFigure.propTypes = {
  figure: PropTypes.object,
};

export default DisplayFigure;
