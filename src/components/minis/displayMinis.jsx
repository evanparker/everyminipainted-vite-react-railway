import CldThumbnailImage from "../images/CldThumbnailImage";
import PropTypes from "prop-types";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

const DisplayMinis = ({ minis }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {minis.map((mini) => {
        const publicId = mini?.thumbnail?.cloudinaryPublicId;
        return (
          <Link key={mini._id} to={"/minis/" + mini._id}>
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
