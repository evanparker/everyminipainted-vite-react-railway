import { Modal, ModalBody } from "flowbite-react";
import PropTypes from "prop-types";
import CldImage from "./CldImage";
import S3Image from "./s3Image";

function ImageModal({ image, onClose, show }) {
  return (
    <>
      <Modal
        dismissible
        show={show}
        onClose={onClose}
        onClick={onClose}
        size="7xl"
        className="cursor-pointer"
      >
        <ModalBody>
          {image?.type === "s3Image" ? (
            <S3Image image={image} width={1248} className="w-full" />
          ) : (
            <CldImage publicId={image?.cloudinaryPublicId} width={1248} />
          )}
        </ModalBody>
      </Modal>
    </>
  );
}

ImageModal.propTypes = {
  image: PropTypes.object,
  onClose: PropTypes.func,
  show: PropTypes.bool,
};

export default ImageModal;
