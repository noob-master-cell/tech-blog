import React from "react";
import { Navbar, TextInput, Button, Dropdown, Avatar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";

const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme);

  const shouldShowSearch = path !== "/sign-up" && path !== "/sign-in";

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar className="border-b-2 dark:bg-[rgb(16,23,42)]">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white flex items-center transition-transform transform hover:scale-105"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-400 via-purple-350 to-violet-400 rounded-lg text-white mr-1">
          Byte
        </span>
        Sphere
      </Link>

      {shouldShowSearch && (
        <form>
          <TextInput
            type="text"
            placeholder="Search here . ."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline dark:bg-gray-700 dark:text-white"
          />
        </form>
      )}

      <Button className="w-12 h-10 hidden lg transition-transform transform hover:scale-105 dark:bg-gray-700 dark:text-white">
        <AiOutlineSearch />
      </Button>

      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline transition-transform transform hover:scale-105 dark:bg-gray-700 dark:text-white"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm font-medium truncate">
                @{currentUser.username}
              </span>
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item className="transition-transform transform hover:scale-105 hover:text-indigo-600 dark:hover:text-white">
                Profile
              </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Link to="/sign-in">
              <Dropdown.Item
                className="transition-transform transform hover:scale-105 hover:text-indigo-600 dark:hover:text-white"
                onClick={handleSignout}
              >
                Sign Out
              </Dropdown.Item>
            </Link>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button
              outline
              className="bg-gradient-to-r from-indigo-400 via-purple-350 to-violet-400 text-white outline-none transition-transform transform hover:scale-105"
            >
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link
          className="transition-transform transform hover:scale-105 hover:text-indigo-600 dark:hover:text-white"
          active={path === "/"}
          as={"div"}
        >
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link
          as={"div"}
          className="transition-transform transform hover:scale-105 hover:text-indigo-600 dark:hover:text-white"
        >
          <a
            href="https://www.freecodecamp.org/news/tag/projects/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Projects
          </a>
        </Navbar.Link>
        <Navbar.Link
          className="transition-transform transform hover:scale-105 hover:text-indigo-600 dark:hover:text-white"
          active={path === "/about"}
          as={"div"}
        >
          <Link to="/about">About</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
