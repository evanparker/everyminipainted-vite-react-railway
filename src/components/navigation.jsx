import {
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavbarLink,
  Dropdown,
  DropdownItem,
  DarkThemeToggle,
  DropdownHeader,
  Avatar,
} from "flowbite-react";
import { Link } from "react-router-dom";
import CldThumbnailImage from "./images/CldThumbnailImage";
import { FaPlus, FaUser } from "react-icons/fa6";
import S3Image from "./images/s3Image";

function Navigation({ user }) {
  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} to={"/"}>
        <img src="/emplogo.png" className="mr-3 h-9" alt="EMP Logo" />
        <span className="hidden sm:block self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Every Mini Painted
        </span>
        <span className="block sm:hidden self-center whitespace-nowrap text-md font-semibold dark:text-white">
          EMP
        </span>
      </NavbarBrand>
      <div className="flex md:order-2 gap-5">
        <DarkThemeToggle />

        <Dropdown
          arrowIcon={false}
          inline
          className="z-20"
          label={
            <Avatar
              rounded
              className="cursor-pointer"
              img={(props) => (
                <>
                  {(user?.avatar && (
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      {user?.avatar.type === "s3Image" ? (
                        <S3Image image={user?.avatar} width={40} height={40} />
                      ) : (
                        <CldThumbnailImage
                          publicId={user?.avatar?.cloudinaryPublicId}
                          width={40}
                          height={40}
                          {...props}
                        />
                      )}
                    </div>
                  )) || (
                    <div className="cursor-pointer rounded-full p-2 bg-gray-200 dark:bg-gray-600 dark:text-white">
                      <FaUser />
                    </div>
                  )}
                </>
              )}
            ></Avatar>
          }
        >
          {user && (
            <>
              <DropdownHeader className="dark:text-white">
                <span className="block text-sm">{user.username}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </DropdownHeader>
              <DropdownItem
                className="dark:text-white"
                as={Link}
                to={`/users/${user.username}`}
              >
                Profile
              </DropdownItem>
              <DropdownItem
                className="dark:text-white"
                as={Link}
                to={"/logout"}
              >
                Sign out
              </DropdownItem>
            </>
          )}
          {!user && (
            <>
              <DropdownItem className="dark:text-white" as={Link} to={`/login`}>
                Login
              </DropdownItem>
              <DropdownItem
                className="dark:text-white"
                as={Link}
                to={`/signup`}
              >
                Signup
              </DropdownItem>
            </>
          )}
        </Dropdown>

        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink as={Link} to={"/minis"}>
          Minis
        </NavbarLink>
        <NavbarLink as={Link} to={"/figures"}>
          Figures
        </NavbarLink>
        <NavbarLink as={Link} to={"/manufacturers"}>
          Manufacturers
        </NavbarLink>
        {user && (
          <NavbarLink as={Link} to={"/minis/new"}>
            <FaPlus className="inline" /> New Mini
          </NavbarLink>
        )}
      </NavbarCollapse>
    </Navbar>
  );
}

export default Navigation;
