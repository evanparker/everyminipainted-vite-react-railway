import { useEffect, useState } from "react";
import { getFigures } from "../../services/figure";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import CldThumbnailImage from "../images/CldThumbnailImage";
import { HiPlus } from "react-icons/hi";
import { getUserByMe } from "../../services/user";

const Figures = () => {
  const [figures, setFigures] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const figuresData = await getFigures();
      setFigures(figuresData);
    };
    const fetchSelfData = async () => {
      const selfData = await getUserByMe();
      if (selfData.roles.includes("admin")) {
        setIsAdmin(true);
      }
    };

    fetchData();
    fetchSelfData();
  }, []);

  return (
    <>
      {isAdmin && (
        <div className="mb-5 flex gap-5">
        <Button as={Link} to={`/figures/new`}>
          <HiPlus className="inline" /> New Figure
        </Button>
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        {figures.map((figure) => {
          const publicId = figure?.images[0]?.cloudinaryPublicId;
          return (
            <Link key={figure._id} to={"/figures/" + figure._id}>
              <Card
                className="w-60 overflow-hidden text-gray-900 dark:text-white"
                renderImage={() =>
                  publicId && (
                    <CldThumbnailImage
                      publicId={publicId}
                      width={200}
                      height={200}
                    />
                  )
                }
              >
                {figure.name}
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Figures;
