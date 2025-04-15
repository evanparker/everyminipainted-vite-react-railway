import CldThumbnailImage from "../images/CldThumbnailImage";
import PropTypes from "prop-types";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

const DisplayMinis = ({ minis }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {minis.map((mini) => {
        const publicId = mini?.thumbnail?.cloudinaryPublicId;
        return (
          <Link
            key={mini._id}
            to={"/minis/" + mini._id}
            className="w-full sm:w-60 grow"
          >
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
              {mini.name}
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

DisplayMinis.propTypes = {
  minis: PropTypes.arrayOf(PropTypes.object),
};
export default DisplayMinis;
