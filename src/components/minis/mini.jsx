import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useUserData from "../../useUserData";
import DisplayMini from "./displayMini";
import { deleteMini, getMini } from "../../services/mini";
import { Button } from "flowbite-react";
import DeleteModal from "../deleteModal";
import UserAvatar from "../users/userAvatar";
import { FaPencil, FaTrashCan } from "react-icons/fa6";

const Mini = () => {
  const navigate = useNavigate();
  const [mini, setMini] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { token, userId } = useUserData();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const miniData = await getMini(id);
      setMini(miniData);
    };
    fetchData();
  }, [id]);

  const handleDeleteMini = async () => {
    const deletedMini = await deleteMini(id);
    if (deletedMini) {
      navigate("/");
    }
  };

  return (
    <div>
      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteMini}
      />
      {mini && <DisplayMini mini={mini} />}
      {mini?.userId && (
        <div className="mt-5 w-xs">
          <UserAvatar user={mini?.userId} />
        </div>
      )}
      <div className="flex gap-5">
        {token && userId === mini?.userId._id && (
          <Button
            className="max-w-36 mt-5"
            as={Link}
            to={"/minis/" + id + "/edit"}
          >
            <FaPencil className="mr-2 h-5 w-5" />
            Edit
          </Button>
        )}
        {token && userId === mini?.userId._id && (
          <Button
            color="red"
            className="max-w-36 mt-5"
            onClick={() => setShowDeleteModal(true)}
          >
            <FaTrashCan className="mr-2 h-5 w-5" /> Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default Mini;
