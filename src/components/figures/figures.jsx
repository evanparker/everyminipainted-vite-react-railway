import { useEffect, useState } from "react";
import { getFigures } from "../../services/figure";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import CldThumbnailImage from "../images/CldThumbnailImage";

const Figures = () => {
  const [figures, setFigures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const figuresData = await getFigures();
      setFigures(figuresData);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      {figures.map((figure) => {
        const publicId = figure?.images[0]?.cloudinaryPublicId;
        return (
          <Link key={figure._id} to={"/figures/" + figure._id}>
            <Card
              className="w-60 overflow-hidden text-gray-900 dark:text-white"
              renderImage={() => publicId && <CldThumbnailImage publicId={publicId} width={238} height={238} />}
            >
              {figure.name}
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default Figures;
