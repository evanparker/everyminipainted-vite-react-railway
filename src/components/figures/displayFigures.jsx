import CldThumbnailImage from "../images/CldThumbnailImage";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import S3Image from "../images/s3Image";

const DisplayFigures = ({ figures }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {figures.map((figure) => {
        const img = figure?.thumbnail;
        return (
          <Link key={figure._id} to={"/figures/" + figure._id}>
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
              {figure.name}
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default DisplayFigures;
