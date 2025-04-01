import { FaTrash } from "react-icons/fa6";
import Socials from "../constants/socials";
import {
  Button,
  Dropdown,
  DropdownItem,
  Label,
  TextInput,
} from "flowbite-react";

const SocialsForm = ({ socials, setSocials }) => {
  const addSocialField = (social) => {
    setSocials((prevSocials) => [
      ...prevSocials,
      { service: social.service, link: "" },
    ]);
  };

  const deleteSocialField = (index) => {
    setSocials((prevSocials) => [
      ...prevSocials.filter((value, i) => index !== i),
    ]);
  };

  const handleSocialFieldChange = (e, social, index) => {
    setSocials((prevSocials) => {
      const socialsCopy = [...prevSocials];
      socialsCopy[index] = { service: social.service, link: e.target.value };
      return socialsCopy;
    });
  };

  return (
    <>
      <div className="block max-w-lg">
        <Label>Socials</Label>

        <Dropdown
          id="socials-dropdown-button"
          className="mb-2 shadow-md"
          label="Add Social"
        >
          {Object.keys(Socials).map((social) => (
            <div key={Socials[social].service}>
              <DropdownItem
                key={social.service}
                onClick={() => addSocialField(Socials[social])}
                icon={Socials[social].icon}
              >
                {Socials[social].name}
              </DropdownItem>
            </div>
          ))}
        </Dropdown>

        <div className="flex flex-col gap-2">
          {socials?.map((social, index) => (
            <div className="flex gap-2 items-center" key={`socials${index}`}>
              <TextInput
                icon={Socials[social.service].icon}
                type="search"
                id={`socials${index}`}
                key={`socials${index}`}
                className="grow-1"
                placeholder=""
                value={social.link}
                onChange={(e) => handleSocialFieldChange(e, social, index)}
              />
              <Button
                onClick={() => deleteSocialField(index)}
                color="gray"
                className=" px-3 cursor-pointer text-gray-500 hover:text-gray-800 bg-gray-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:text-gray-200"
              >
                <FaTrash />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SocialsForm;
