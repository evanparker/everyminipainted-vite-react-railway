import { useEffect, useState } from "react";
import { getFigures } from "../../services/figure";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { getUserByMe } from "../../services/user";
import { FaPlus } from "react-icons/fa6";
import { Pagination } from "flowbite-react";
import DisplayFigures from "./displayFigures";

const itemsPerPage = 20;

const Figures = () => {
  const [figures, setFigures] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const results = await getFigures({
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage,
      });
      setTotalPages(results.totalPages);
      setFigures(results.docs);
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const fetchSelfData = async () => {
      const selfData = await getUserByMe();
      if (selfData?.roles?.includes("admin")) {
        setIsAdmin(true);
      }
    };

    fetchSelfData();
  }, []);

  const onPageChange = (page) => setCurrentPage(page);

  return (
    <>
      {isAdmin && (
        <div className="mb-5 flex gap-5">
          <Button as={Link} to={`/figures/new`}>
            <FaPlus className="inline" /> New Figure
          </Button>
        </div>
      )}

      <DisplayFigures figures={figures} />
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

export default Figures;
