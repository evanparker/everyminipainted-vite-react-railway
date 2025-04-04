import { useEffect, useState } from "react";
import { getManufacturers } from "../../services/manufacturer";
import { Button, Card } from "flowbite-react";
import { Link, useSearchParams } from "react-router-dom";
import CldThumbnailImage from "../images/CldThumbnailImage";
import { getUserByMe } from "../../services/user";
import { FaPlus } from "react-icons/fa6";
import { Pagination } from "flowbite-react";

const itemsPerPage = 20;

const Manufacturers = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || 1)
  );
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const results = await getManufacturers({
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage,
      });
      setTotalPages(results.totalPages);
      setManufacturers(results.docs);
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get("page") || 1));
  }, [searchParams]);

  useEffect(() => {
    const fetchSelfData = async () => {
      const selfData = await getUserByMe();
      if (selfData?.roles?.includes("admin")) {
        setIsAdmin(true);
      }
    };

    fetchSelfData();
  }, []);

  const onPageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ page }, { replace: false });
  };

  return (
    <>
      {isAdmin && (
        <div className="mb-5 flex gap-5">
          <Button as={Link} to={`/manufacturers/new`}>
            <FaPlus className="inline" /> New Manufacturer
          </Button>
        </div>
      )}
      <div className="flex flex-wrap gap-4">
        {manufacturers.map((manufacturer) => {
          const publicId = manufacturer?.thumbnail?.cloudinaryPublicId;
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
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default Manufacturers;
