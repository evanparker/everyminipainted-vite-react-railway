import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { FileInput, Label } from "flowbite-react";

const DragAndDrop = ({ addImages }) => {
  const [dragOver, setDragOver] = useState(false);
  const [loadingStates, setLoadingStates] = useState([]);
  const abortControllerRef = useRef(new AbortController());

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.target?.files || e.dataTransfer.files);
    let publicIds = [];
    setLoadingStates(new Array(files.length).fill(true));

    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
    if (files && files.length > 0) {
      const url = `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUD_NAME
      }/upload`;
      for (let file of files) {
        try {
          const formData = new FormData();
          const fields = {
            file,
            upload_preset: import.meta.env.VITE_UPLOAD_PRESET,
            tags: ["myphotoalbum-react"],
            multiple: true,
            resource_type: "image",
          };

          Object.entries(fields).forEach(([key, value]) => {
            formData.append(key, value);
          });

          const options = {
            method: "POST",
            body: formData,
            signal: abortControllerRef.current.signal,
          };
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error("Failed to execute file upload via the Fetch API");
          }
          const json = await response.json();
          const publicId = json.public_id;

          publicIds.push(publicId);
          setLoadingStates((prevStates) =>
            prevStates.map((state, index) =>
              file === files[index] ? false : state
            )
          );
          if (!loadingStates.some((loading) => loading)) {
            addImages(publicIds);
          }
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error(error);
          }
          setLoadingStates((prevStates) =>
            prevStates.map((state, index) =>
              file === files[index] ? false : state
            )
          );
        }
      }
    }
  };

  useEffect(() => {
    return () => {
      abortControllerRef.current.abort();
    };
  }, []);

  return (
    <>
      <Label
        htmlFor="dropzone-file"
        className={`flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${dragOver ? `border-green-300 dark:border-green-600` : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
      <div className="flex flex-col items-center justify-center pb-6 pt-5">
        <svg
          className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          Drag and drop to upload
        </p>
      </div>
      <FileInput id="dropzone-file" className="hidden" multiple onChange={(e)=>{handleDrop(e)}} />
      </Label>
    </>
  );
};

DragAndDrop.propTypes = {
  addImages: PropTypes.func,
};

export default DragAndDrop;
