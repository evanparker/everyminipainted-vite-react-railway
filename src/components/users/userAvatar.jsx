import { HiOutlineUser } from "react-icons/hi";
import CldThumbnailImage from "../images/CldThumbnailImage";
import { Avatar } from "flowbite-react";
import PropTypes from "prop-types";

const UserAvater = ({ user }) => {
  return (
    <>
      {user && (
        <div className="w-xs flex bg-gray-100 dark:bg-gray-700 pl-5 pr-5 pt-3 pb-3 rounded-lg">
          <Avatar
            rounded
            className=""
            img={(props) => (
              <>
                {(user.avatar && (
                  <div className="w-10 h-10 overflow-hidden rounded-full">
                    <CldThumbnailImage
                      publicId={user.avatar?.cloudinaryPublicId}
                      width={40}
                      height={40}
                      {...props}
                    />
                  </div>
                )) || (
                  <div className="rounded-full p-2 bg-gray-200 dark:bg-gray-600 dark:text-white">
                    <HiOutlineUser />
                  </div>
                )}
              </>
            )}
          ></Avatar>
          <div className="ml-5 space-y-1 font-medium  dark:text-white">
            <div>{user.username}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Joined in August 2014
            </div>
          </div>
        </div>
      )}
    </>
  );
};
UserAvater.propTypes = {
  user: PropTypes.object,
};
export default UserAvater;
