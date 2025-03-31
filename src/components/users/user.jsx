import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getMinisByUsername,
  getUserByMe,
  getUserByUsername,
} from "../../services/user";
import DisplayMinis from "../minis/displayMinis";
import UserAvatar from "./userAvatar";
import { Button } from "flowbite-react";
import SocialsBlock from "../socialsBlock";
import Markdown from "react-markdown";

const User = () => {
  const [minis, setMinis] = useState();
  const [user, setUser] = useState();
  const [self, setSelf] = useState();
  const { username } = useParams();

  useEffect(() => {
    const fetchMinisData = async () => {
      const minisData = await getMinisByUsername(username);
      setMinis(minisData);
    };
    const fetchUserData = async () => {
      const userData = await getUserByUsername(username);
      setUser(userData);
    };
    const fetchSelfData = async () => {
      const selfData = await getUserByMe();
      setSelf(selfData);
    };

    fetchUserData();
    fetchMinisData();
    fetchSelfData();
  }, [username]);

  return (
    <>
      {minis && (
        <div className="flex flex-col gap-5">
          <div className="">
            <UserAvatar user={user} />
          </div>

          {user?.description && (
            <div className="format dark:format-invert">
              <Markdown>{user?.description}</Markdown>
            </div>
          )}

          {user?.website && (
            <div className="max-w-md">
              <Link to={user.website}>
                <div className="p-3 cursor-pointer rounded-lg border overflow-hidden border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white">
                  <div className="mb-1 text-xs text-gray-600 dark:text-gray-400">
                    Website:
                  </div>
                  {user.website}
                </div>
              </Link>
            </div>
          )}

          <SocialsBlock socials={user.socials} />

          {self?._id === user?._id && (
            <div className="flex">
              <Button as={Link} to={`/users/edit`}>
                Edit Profile
              </Button>
            </div>
          )}

          <DisplayMinis minis={minis} />
        </div>
      )}
    </>
  );
};

export default User;
