import { Button, Pagination } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link, useSearchParams } from "react-router-dom";
import { itemsPerPage } from "../../constants/requestDefaults";
import { getFigures, getFiguresBySearch } from "../../services/figure";
import UserContext from "../../userContext";
import DisplayFigures from "./displayFigures";
import toBool from "../../util/toBool";

const Figures = () => {
  const { user } = useContext(UserContext);
  const [figures, setFigures] = useState([]);
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
        results = await getFiguresBySearch(searchString, {
          limit: itemsPerPage,
          offset: (currentPage - 1) * itemsPerPage,
        });
        setTotalPages(results.totalPages);
        setFigures(results.docs);
      } else {
        results = await getFigures({
          limit: itemsPerPage,
          offset: (currentPage - 1) * itemsPerPage,
        });
        setTotalPages(results.totalPages);
        setFigures(results.docs);
      }
    };

    fetchData();
  }, [searchString, currentPage]);

  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get("page") || 1));
  }, [searchParams]);

  useEffect(() => {
    if (user?.roles?.includes("admin")) {
      setIsAdmin(true);
    }
  }, [user]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    const searchParams = { page };
    if (searchString) {
      searchParams.search = searchString;
    }
    setSearchParams(searchParams, { replace: false });
  };

  const canEditFigure = () => {
    return (
      (import.meta.env.VITE_EDIT_FIGURE_REQUIRES_ADMIN !== undefined &&
        toBool(import.meta.env.VITE_EDIT_FIGURE_REQUIRES_ADMIN) === false) ||
      isAdmin
    );
  };

  return (
    <>
      {canEditFigure && (
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
