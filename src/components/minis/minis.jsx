import { useEffect, useState } from "react";
import { getMinis } from "../../services/mini";
import DisplayMinis from "./displayMinis";

const Minis = () => {
  const [minis, setMinis] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const minisData = await getMinis();
      setMinis(minisData);
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <DisplayMinis minis={minis}/>
      </div>
    </>
  );
};

export default Minis;
