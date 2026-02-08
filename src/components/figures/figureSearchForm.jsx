import { FaCaretDown, FaMagnifyingGlass } from "react-icons/fa6";
import { HelperText, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import AutoCompleteInput from "../autoCompleteInput";
import { getManufacturersBySearch } from "../../services/manufacturer";
import { useNavigate } from "react-router-dom";

const FigureSearchForm = ({ className }) => {
  const navigate = useNavigate();
  const [expand, setExpand] = useState(false);
  const [manufacturerSearch, setManufacturerSearch] = useState("");
  const [manufacturerDropdownOpen, setManufacturerDropdownOpen] =
    useState(false);
  const [manufacturerResults, setManufacturerResults] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState();
  const [search, setSearch] = useState("");

  const toggleExpand = () => {
    setExpand(!expand);
    setSelectedManufacturer(undefined);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setManufacturerDropdownOpen(false);
    navigate(
      "/figures" +
        `?search=${search}${
          selectedManufacturer ? `&manufacturer=${selectedManufacturer.id}` : ""
        }`
    );
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchKeydown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const chooseManufacturer = (manufacturer) => {
    setSelectedManufacturer(manufacturer);
    setManufacturerSearch(manufacturer?.name || "");
    setManufacturerDropdownOpen(false);
  };

  const handleManufacturerSearchChange = async (e) => {
    e.preventDefault();
    setManufacturerSearch(e.target.value);
    const manufacturers = await getManufacturersBySearch(e.target.value, {
      limit: 20,
      offset: 0,
    });
    setManufacturerDropdownOpen(true);
    setManufacturerResults(manufacturers.docs);
  };

  const handleManufacturerSearchBlur = (e) => {
    if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
      setManufacturerDropdownOpen(false);
    }
  };

  return (
    <form className={`${className} z-10 relative`} onSubmit={handleSubmit}>
      <div className="relative">
        <label
          htmlFor="figureSearch"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search Figures
        </label>
        <TextInput
          id="figureSearch"
          type="search"
          placeholder="Search Figures..."
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeydown}
        />
        <button
          type="submit"
          className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <FaMagnifyingGlass />
        </button>
      </div>
      {!expand && (
        <HelperText>
          <span onClick={toggleExpand} className="text-blue-500 cursor-pointer">
            Advanced Search... <FaCaretDown className="inline align-baseline" />
          </span>
        </HelperText>
      )}
      {expand && (
        <div className="max-w-lg">
          <Label htmlFor="manufacturerDropdown">Manufacturer Select</Label>
          <AutoCompleteInput
            chooseItem={chooseManufacturer}
            dropdownOpen={manufacturerDropdownOpen}
            setDropdownOpen={setManufacturerDropdownOpen}
            onChange={handleManufacturerSearchChange}
            onFocus={handleManufacturerSearchChange}
            value={manufacturerSearch}
            items={manufacturerResults}
            onBlur={handleManufacturerSearchBlur}
            id="manufacturerDropdown"
          />
        </div>
      )}
    </form>
  );
};

export default FigureSearchForm;
