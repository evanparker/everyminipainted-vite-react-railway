import { useEffect, useState } from "react";
import { getMinis, getMinisBySearch } from "../../services/mini";
import DisplayMinis from "./displayMinis";
import { Pagination } from "flowbite-react";
import { useSearchParams } from "react-router-dom";

const itemsPerPage = 20;

const Minis = () => {
  const [minis, setMinis] = useState([]);
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
        results = await getMinisBySearch(searchString, {
          limit: itemsPerPage,
          offset: (currentPage - 1) * itemsPerPage,
        });
      } else {
        results = await getMinis({
          limit: itemsPerPage,
          offset: (currentPage - 1) * itemsPerPage,
        });
      }
      setTotalPages(results.totalPages);
      setMinis(results.docs);
    };
    fetchData();
  }, [searchString, currentPage]);

  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get("page") || 1));
  }, [searchParams]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ page, search: searchString }, { replace: false });
  };

  return (
    <>
      <div>
        <DisplayMinis minis={minis} />
        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Minis;
