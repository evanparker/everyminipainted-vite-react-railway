import { useEffect, useState } from "react";
import {
  getManufacturers,
  getManufacturersBySearch,
} from "../../services/manufacturer";
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
  const searchString = searchParams.get("search");

  useEffect(() => {
    const fetchData = async () => {
      let results;
      if (searchString) {
        results = await getManufacturersBySearch(searchString, {
          limit: itemsPerPage,
          offset: (currentPage - 1) * itemsPerPage,
        });
      } else {
        results = await getManufacturers({
          limit: itemsPerPage,
          offset: (currentPage - 1) * itemsPerPage,
        });
      }
      setTotalPages(results.totalPages);
      setManufacturers(results.docs);
    };

    fetchData();
  }, [searchString, currentPage]);

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
    const searchParams = { page };
    if (searchString) {
      searchParams.search = searchString;
    }
    setSearchParams(searchParams, { replace: false });
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
