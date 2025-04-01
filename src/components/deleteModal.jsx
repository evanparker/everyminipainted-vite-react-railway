import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import PropTypes from "prop-types";
import { FaTrashCan } from "react-icons/fa6";

function DeleteModal({ show, onClose, onConfirm }) {
  return (
    <Modal dismissible show={show} onClose={onClose} size="xl" className="">
      <ModalHeader>Are you sure?</ModalHeader>
      <ModalBody className="flex gap-5">
        <Button color="red" onClick={onConfirm}>
          <FaTrashCan className="mr-2 h-5 w-5" /> Delete
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalBody>
    </Modal>
  );
}

DeleteModal.propTypes = {
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  show: PropTypes.bool,
};

export default DeleteModal;
