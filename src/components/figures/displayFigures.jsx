import CldThumbnailImage from "../images/CldThumbnailImage";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

const DisplayFigures = ({ figures }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {figures.map((figure) => {
        const publicId = figure?.thumbnail?.cloudinaryPublicId;
        return (
          <Link key={figure._id} to={"/figures/" + figure._id}>
            <Card
              className="w-60 overflow-hidden text-gray-900 dark:text-white"
              renderImage={() =>
                publicId && (
                  <CldThumbnailImage
                    publicId={publicId}
                    width={200}
                    height={200}
                  />
                )
              }
            >
              {figure.name}
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default DisplayFigures;
