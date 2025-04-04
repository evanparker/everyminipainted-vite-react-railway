import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import DisplayFigure from "./displayFigure";
import { deleteFigure, getFigure, getFigureMinis } from "../../services/figure";
import { Button, Pagination } from "flowbite-react";
import DeleteModal from "../deleteModal";
import { getUserByMe } from "../../services/user";
import DisplayMinis from "../minis/displayMinis";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import DeleteToast from "../toasts/deleteToast";
import { toast } from "react-toastify/unstyled";

const itemsPerPage = 20;

const Figure = () => {
  const navigate = useNavigate();
  const [figure, setFigure] = useState();
  const [minis, setMinis] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || 1)
  );
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchSelfData = async () => {
      const selfData = await getUserByMe();
      if (selfData?.roles?.includes("admin")) {
        setIsAdmin(true);
      }
    };

    fetchSelfData();
  }, []);

  useEffect(() => {
    const fetchFigureData = async () => {
      const figureData = await getFigure(id);
      setFigure(figureData);
    };

    fetchFigureData();
  }, [id]);

  useEffect(() => {
    const fetchFigureMinisData = async () => {
      const results = await getFigureMinis(id, {
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage,
      });
      setTotalPages(results.totalPages);
      setMinis(results.docs);
    };

    fetchFigureMinisData();
  }, [currentPage, id]);

  const handleDeleteFigure = async () => {
    const deletedFigure = await deleteFigure(id);
    if (deletedFigure) {
      toast(DeleteToast, {
        data: { message: `${figure.name} Deleted` },
      });

      navigate("/figures");
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ page }, { replace: true });
  };

  return (
    <div>
      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteFigure}
      />
      {figure && <DisplayFigure figure={figure} />}
      {isAdmin && (
        <div className="flex gap-5">
          <Button
            className="max-w-36 mt-5"
            as={Link}
            to={"/figures/" + id + "/edit"}
          >
            <FaPencil className="mr-2 h-5 w-5" />
            Edit
          </Button>
          <Button
            color="red"
            className="max-w-36 mt-5"
            onClick={() => setShowDeleteModal(true)}
          >
            <FaTrashCan className="mr-2 h-5 w-5" /> Delete
          </Button>
        </div>
      )}
      {minis?.length > 0 && (
        <>
          <h3 className="mt-5 text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
            Minis
          </h3>
          <div className="mt-5">
            <DisplayMinis minis={minis} />
          </div>
          <div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Figure;
