import { Toast } from "flowbite-react";
import { FaTrashCan } from "react-icons/fa6";

const DeleteToast = ({ data = {} }) => {
  return (
    <Toast>
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
        <FaTrashCan className="h-5 w-5" />
      </div>
      <div className="pl-4 text-sm font-normal">
        {data.message || "Deleted."}
      </div>
    </Toast>
  );
};

export default DeleteToast;
