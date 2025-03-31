import { HiOutlineUser } from "react-icons/hi";
import CldThumbnailImage from "../images/CldThumbnailImage";
import { Avatar } from "flowbite-react";
import PropTypes from "prop-types";
import SocialsBlock from "../socialsBlock";

const UserAvatar = ({ user }) => {
  return (
    <>
      {user && (
        <div className="w-xs flex items-center bg-gray-100 dark:bg-gray-700 pl-5 pr-5 pt-3 pb-3 rounded-lg">
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
            {user.socials?.length > 0 && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <SocialsBlock socials={user.socials} compact={true} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
UserAvatar.propTypes = {
  user: PropTypes.object,
};
export default UserAvatar;
