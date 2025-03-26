import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMinisByUsername, getUserByUsername } from "../../services/user";
import DisplayMinis from "../minis/displayMinis";
import UserAvater from "./userAvatar";

const User = () => {
  const [minis, setMinis] = useState();
  const [user, setUser] = useState();
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
    fetchUserData();
    fetchMinisData();
  }, [username]);

  return (
    <>
      {minis && (
        <div>
          <div className="mb-5">
            <UserAvater user={user} />
          </div>
          <DisplayMinis minis={minis} />
        </div>
      )}
    </>
  );
};

export default User;
