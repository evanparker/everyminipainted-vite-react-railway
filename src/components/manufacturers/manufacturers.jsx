import { useEffect, useState } from "react";
import { getManufacturers } from "../../services/manufacturer";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import CldThumbnailImage from "../images/CldThumbnailImage";
import { getUserByMe } from "../../services/user";
import { HiPlus } from "react-icons/hi";

const Manufacturers = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const manufacturersData = await getManufacturers();
      setManufacturers(manufacturersData);
    };

    const fetchSelfData = async () => {
      const selfData = await getUserByMe();
      if (selfData.roles.includes("admin")) {
        setIsAdmin(true);
      }
    };

    fetchData();
    fetchSelfData();
  }, []);

  return (
    <>
      {isAdmin && (
        <div className="mb-5 flex gap-5">
          <Button as={Link} to={`/manufacturers/new`}>
            <HiPlus className="inline" /> New Manufacturer
          </Button>
        </div>
      )}
      <div className="flex flex-wrap gap-4">
        {manufacturers.map((manufacturer) => {
          const publicId = manufacturer?.images[0]?.cloudinaryPublicId;
          return (
            <Link
              key={manufacturer._id}
              to={"/manufacturers/" + manufacturer._id}
            >
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
                {manufacturer.name}
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Manufacturers;
