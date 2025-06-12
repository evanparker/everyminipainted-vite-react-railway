import { useContext, useEffect, useState } from "react";
import { getInvites, postInvite } from "../../services/invite";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import UserContext from "../../userContext";

const GenerateInvite = () => {
  const { user } = useContext(UserContext);
  const [invites, setInvites] = useState([]);
  const [inviteCode, setInviteCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== undefined && !user?.roles?.includes("admin")) {
      navigate("/404", { replace: true });
    }
    const fetchData = async () => {
      const results = await getInvites();

      setInvites(results);
    };
    if (user?.roles?.includes("admin")) {
      fetchData();
    }
  }, [user, navigate]);

  const handleInviteCodeChange = (e) => {
    e.preventDefault();
    setInviteCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const invite = await postInvite({ code: inviteCode });
    if (invite) {
      setInviteCode("");
      setInvites((prevInvites) => [invite, ...prevInvites]);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mb-10">
        <div className="max-w-lg block">
          <Label htmlFor="inviteCode1">Invite Code</Label>
          <TextInput
            id="inviteCode1"
            type="text"
            value={inviteCode}
            onChange={handleInviteCodeChange}
            required={true}
          />
        </div>
        <div className="max-w-lg">
          <Button type="submit">Save</Button>
        </div>
      </form>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Invite Codes</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {invites.map((invite) => (
            <TableRow
              key={invite.code}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <TableCell>{invite.code}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default GenerateInvite;
