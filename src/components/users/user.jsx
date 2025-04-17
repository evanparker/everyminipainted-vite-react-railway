import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
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
import { Pagination } from "flowbite-react";

const itemsPerPage = 20;

const User = () => {
  const [minis, setMinis] = useState();
  const [user, setUser] = useState();
  const [self, setSelf] = useState();
  const { username } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || 1)
  );
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchSelfData = async () => {
      const selfData = await getUserByMe();
      setSelf(selfData);
    };

    fetchSelfData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserByUsername(username);
      setUser(userData);
    };
    fetchUserData();
  }, [username]);

  useEffect(() => {
    const fetchMinisData = async () => {
      const results = await getMinisByUsername(username, {
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage,
      });
      setTotalPages(results.totalPages);
      setMinis(results.docs);
    };

    fetchMinisData();
  }, [currentPage, username]);

  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get("page") || 1));
  }, [searchParams]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ page }, { replace: false });
  };

  return (
    <>
      {minis && (
        <div className="flex flex-col gap-5">
          <div className="w-xs">
            <UserAvatar user={user} isLink={false} />
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

          <SocialsBlock socials={user?.socials} />

          {self?._id === user?._id && (
            <div className="flex gap-5">
              <Button as={Link} to={`/users/edit`}>
                Edit Profile
              </Button>
              <Button as={Link} to={`/password`} outline>
                Edit Password
              </Button>
            </div>
          )}

          <DisplayMinis minis={minis} />
          <div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default User;
