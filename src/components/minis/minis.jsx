import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { itemsPerPage } from "../../constants/requestDefaults";
import { getMinis, getMinisBySearch } from "../../services/mini";
import DisplayMinis from "./displayMinis";
import SearchBar from "../searchBar";

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
    const searchParams = { page };
    if (searchString) {
      searchParams.search = searchString;
    }
    setSearchParams(searchParams, { replace: false });
  };

  return (
    <>
      <div>
        <SearchBar className="mb-5" placeholder="Search Minis..." />
        <DisplayMinis minis={minis} />
        <div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Minis;
