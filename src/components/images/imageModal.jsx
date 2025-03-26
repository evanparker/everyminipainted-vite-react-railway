import { Modal, ModalBody } from "flowbite-react";
import PropTypes from "prop-types";
import CldImage from "./CldImage";


function ImageModal ({image, onClose, show}) {

  return <>
    <Modal dismissible show={show} onClose={onClose} onClick={onClose} size="7xl" className="cursor-pointer">
      <ModalBody>
        <CldImage publicId={image?.cloudinaryPublicId} width={1248} />
      </ModalBody>
    </Modal>
  </>
}

ImageModal.propTypes = {
  image: PropTypes.object,
  onClose: PropTypes.func,
  show: PropTypes.bool
};

export default ImageModal;