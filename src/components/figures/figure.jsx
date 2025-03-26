import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DisplayFigure from "./displayFigure";
import { deleteFigure, getFigure } from "../../services/figure";
import { Button } from "flowbite-react";
import DeleteModal from "../deleteModal";
import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";
import { getUserByMe } from "../../services/user";

const Figure = () => {
  const navigate = useNavigate();
  const [figure, setFigure] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchFigureData = async () => {
      const figureData = await getFigure(id);
      setFigure(figureData);
    };
    const fetchSelfData = async () => {
      const selfData = await getUserByMe();
      if(selfData.roles.includes("admin")) {
        setIsAdmin(true);
      }
    };
    
    fetchFigureData();
    fetchSelfData();
  }, [id]);

  const handleDeleteFigure = async () => {
    const deletedFigure = await deleteFigure(id);
    if (deletedFigure) {
      navigate("/figures");
    }
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
            <BsFillPencilFill className="mr-2 h-5 w-5" />
            Edit
          </Button>
          <Button
            color="red"
            className="max-w-36 mt-5"
            onClick={() => setShowDeleteModal(true)}
          >
            <BsFillTrash3Fill className="mr-2 h-5 w-5" /> Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default Figure;
