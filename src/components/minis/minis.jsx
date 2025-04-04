import { useEffect, useState } from "react";
import { getMinis } from "../../services/mini";
import DisplayMinis from "./displayMinis";
import { Pagination } from "flowbite-react";

const itemsPerPage = 20;

const Minis = () => {
  const [minis, setMinis] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const results = await getMinis({
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage,
      });
      setTotalPages(results.totalPages);
      const minisData = results.docs;
      setMinis(minisData);
    };
    fetchData();
  }, [currentPage]);

  const onPageChange = (page) => setCurrentPage(page);

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
