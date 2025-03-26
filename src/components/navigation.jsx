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
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { HiOutlineUser, HiPlus } from "react-icons/hi";
import CldThumbnailImage from "./images/CldThumbnailImage";

function Navigation({ user }) {
  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} to={"/"}>
        <img src="/vite.svg" className="mr-3 h-6 sm:h-9" alt="Vite Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Every Mini Painted
        </span>
      </NavbarBrand>
      <div className="flex md:order-2 gap-5">
        <DarkThemeToggle />
        {
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                rounded
                className=""
                img={(props) => (
                  <>
                    {(user?.avatar && (
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <CldThumbnailImage
                          publicId={user?.avatar?.cloudinaryPublicId}
                          width={40}
                          height={40}
                          {...props}
                        />
                      </div>
                    )) || (
                      <div className="rounded-full p-2 bg-gray-200 dark:bg-gray-600 dark:text-white">
                        <HiOutlineUser />
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
                <DropdownItem
                  className="dark:text-white"
                  as={Link}
                  to={`/login`}
                >
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
        }
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink as={Link} to={"/minis"}>
          Minis
        </NavbarLink>
        <NavbarLink as={Link} to={"/figures"}>
          Figures
        </NavbarLink>
        {user && (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <NavbarLink>
                <HiPlus className="inline" /> New
              </NavbarLink>
            }
          >
            <DropdownItem>
              <NavbarLink as={Link} to={"/minis/new"}>
                Mini
              </NavbarLink>
            </DropdownItem>
            <DropdownItem>
              <NavbarLink as={Link} to={"/figures/new"}>
                Figure
              </NavbarLink>
            </DropdownItem>
          </Dropdown>
        )}
      </NavbarCollapse>
    </Navbar>
  );
}
Navigation.propTypes = {
  user: PropTypes.object,
};

export default Navigation;
