import React, { useEffect,useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";


const Navbar = () => {
  
  // used to match the route link for highlighting the text
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks , setSublinks] = useState([]);

  const fetchSubLinks = async () => {
    try {
      const response = await apiConnector("GET" , categories.CATEGORIES_API)
      console.log("Response of the Getting Sublinks ", response);
      // const result = await response.json();
      setSublinks(response.data.data)
      // console.log("sublinks \n" , subLinks)
    } catch (error) {
      console.log("Could not fetch the category Api")
    }
  }

  useEffect( () => {
    fetchSubLinks();
  },[])

 

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 z-10">
      <div className="w-11/12 max-w-maxContent flex items-center justify-between">

        {/* Image */}
        <Link to={"/"}>
          <img src={Logo} alt="Logo" width={160} height={32} />
        </Link>

        {/* Nav Link */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="flex items-center gap-2 group relative">
                      <p>{link.title}</p>
                      <IoIosArrowDropdownCircle />

                      <div
                        className="invisible absolute left-[50%] translate-x-[-50%] translate-y-[60%]
                                                top-[50%] flex flex-col bg-richblack-5 p-4  text-richblue-900 opacity-0
                                                tansition-all duration-200 group-hover:visible group-hover:opacity-100
                                                lg:w-[300px] z-1"
                      >
                        <div
                          className="absolute left-[50%] top-0 h-6 w-6 rotate-45 translate-y-[-50%]
                                                    translate-x-[80%]
                                                    rounded bg-richblack-5"
                        ></div>

                        {subLinks.length ? (
                          subLinks.map((subLink, index) => (
                            <Link to={subLink.link} key={index}>
                              <p>{subLink.name}</p>
                            </Link>
                          ))
                        ) : (
                          <div>No Categories fetch</div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Login/Signup/Dashboard */}
        <div className="flex gap-x-4 items-center">
          {user && user.accountType !== "Instructor" && (
            <Link to={"/dashboard/cart"} className="relative">
              <AiOutlineShoppingCart fontSize={24} fill="#AFB2BF" />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}

          {token === null && (
            <Link to={"/login"}>
              <button
                className="border border-richblack-700 bg-richblack-800
                    px-[12px] py-[8px] text-richblack-100 rounded-md"
              >
                Log In
              </button>
            </Link>
          )}

          {token === null && (
            <Link to={"signup"}>
              <button
                className="border border-richblack-700 bg-richblack-800
                    px-[12px] py-[8px] text-richblack-100 rounded-md"
              >
                Sign Up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
