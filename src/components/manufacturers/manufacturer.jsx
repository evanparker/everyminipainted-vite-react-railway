import { Button, Pagination } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify/unstyled";
import { itemsPerPage } from "../../constants/requestDefaults";
import {
  deleteManufacturer,
  getManufacturer,
  getManufacturerFigures,
} from "../../services/manufacturer";
import UserContext from "../../userContext";
import DeleteModal from "../deleteModal";
import DisplayFigures from "../figures/displayFigures";
import DeleteToast from "../toasts/deleteToast";
import DisplayManufacturer from "./displayManufacturer";

const Manufacturer = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [manufacturer, setManufacturer] = useState();
  const [figures, setFigures] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || 1)
  );
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (user?.roles?.includes("admin")) {
      setIsAdmin(true);
    }
  }, [user]);

  useEffect(() => {
    const fetchManufacturerData = async () => {
      const manufacturerData = await getManufacturer(id);
      setManufacturer(manufacturerData);
    };

    fetchManufacturerData();
  }, [id]);

  useEffect(() => {
    const fetchManufacturerFiguresData = async () => {
      const results = await getManufacturerFigures(id, {
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage,
      });
      setTotalPages(results.totalPages);
      setFigures(results.docs);
    };

    fetchManufacturerFiguresData();
  }, [currentPage, id]);

  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get("page") || 1));
  }, [searchParams]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ page }, { replace: false });
  };

  const handleDeleteManufacturer = async () => {
    const deletedManufacturer = await deleteManufacturer(id);
    if (deletedManufacturer) {
      toast(DeleteToast, {
        data: { message: `${manufacturer.name} Deleted` },
      });

      navigate("/manufacturers");
    }
  };

  return (
    <div>
      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteManufacturer}
      />
      {manufacturer && <DisplayManufacturer manufacturer={manufacturer} />}
      {isAdmin && (
        <div className="flex gap-5">
          <Button
            className="max-w-36 mt-5"
            as={Link}
            to={"/manufacturers/" + id + "/edit"}
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
      {figures && (
        <>
          <h3 className="mt-5 text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
            Figures
          </h3>
          <div className="mt-5">
            <DisplayFigures figures={figures} />
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

export default Manufacturer;
