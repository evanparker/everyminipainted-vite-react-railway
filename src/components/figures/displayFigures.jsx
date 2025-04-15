import CldThumbnailImage from "../images/CldThumbnailImage";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

const DisplayFigures = ({ figures }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {figures.map((figure) => {
        const publicId = figure?.thumbnail?.cloudinaryPublicId;
        return (
          <Link key={figure._id} to={"/figures/" + figure._id}>
            <Card
              className="overflow-hidden text-gray-900 dark:text-white"
              renderImage={() =>
                publicId && (
                  <CldThumbnailImage
                    publicId={publicId}
                    width={400}
                    height={400}
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
