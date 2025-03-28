import { useEffect, useState } from "react";
import { getManufacturers } from "../../services/manufacturer";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import CldThumbnailImage from "../images/CldThumbnailImage";

const Manufacturers = () => {
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const manufacturersData = await getManufacturers();
      setManufacturers(manufacturersData);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      {manufacturers.map((manufacturer) => {
        const publicId = manufacturer?.images[0]?.cloudinaryPublicId;
        return (
          <Link key={manufacturer._id} to={"/manufacturers/" + manufacturer._id}>
            <Card
              className="w-60 overflow-hidden text-gray-900 dark:text-white"
              renderImage={() => publicId && <CldThumbnailImage publicId={publicId} width={200} height={200} />}
            >
              {manufacturer.name}
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default Manufacturers;
