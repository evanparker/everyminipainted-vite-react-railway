import CldThumbnailImage from "../images/CldThumbnailImage";
import PropTypes from "prop-types";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

const DisplayMinis = ({ figures }) => {
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

DisplayMinis.propTypes = {
  figures: PropTypes.arrayOf(PropTypes.object),
};
export default DisplayMinis;
