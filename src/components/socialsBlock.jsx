import { Link } from "react-router-dom";
import Socials from "../constants/socials";

const SocialsBlock = ({socials}) => {
  return (
    <>
      {socials?.length > 0 && (
        <div className="max-w-md">
          <div className="mt-5 p-3 cursor-pointer rounded-lg border overflow-hidden border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white">
            <div className="mb-1 text-xs text-gray-600 dark:text-gray-400">
              Socials:
            </div>
            {socials.map((social, index) => {
              const Icon = Socials[social.service].icon;
              return (
                <Link key={`social${index}`} to={social.link}>
                  <div className="flex items-center gap-2 mb-1 text-gray-900 dark:text-white">
                    <Icon /> {social.link}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default SocialsBlock;