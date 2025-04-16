import CldThumbnailImage from "../images/CldThumbnailImage";
import PropTypes from "prop-types";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import S3Image from "../images/s3Image";

const DisplayMinis = ({ minis }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {minis.map((mini) => {
        const img = mini?.thumbnail;
        return (
          <Link key={mini._id} to={"/minis/" + mini._id}>
            <Card
              className="overflow-hidden text-gray-900 dark:text-white"
              renderImage={() =>
                img.type === "s3Image" ? (
                  <S3Image image={img} width={400} height={400} />
                ) : (
                  <CldThumbnailImage
                    publicId={img.cloudinaryPublicId}
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
