import {
  AiOutlineInstagram,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Menu } from "@headlessui/react";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "../utils/Store";
import DropdownLink from "./DropdownLink";

const Layout = ({ children, title }) => {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const [CartitemCount, setCartitemCount] = useState(0);
  useEffect(() => {
    setCartitemCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const [openNav, setOpenNav] = useState(false);
  // const [openSearch, SetOpenSearch] = useState(false);

  const openNavHandler = () => {
    setOpenNav(!openNav);
  };
  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_REST" });
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <Head>
        <title>
          {title ? title + " - Boutique Chamsou" : "Boutique Chamsou"}
        </title>
        <meta name="description" content="Chamsou store" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />

      {/* Header */}
      <header className="z-10">
        <div className="w-full h-[80px] flex justify-between px-10 items-center border-b z-10 bg-white">
          <Link href="/">
            <h1 className="text-3xl z-20 cursor-pointer font-bold">CH</h1>
          </Link>

          {/* icons * large-screen */}
          <div className="items-center justify-between gap-8 hidden md:flex">
            <div className="flex gap-4 items-center border-r-[2px] pr-8">
              <a
                href="https://www.instagram.com/boutique_chamsou_213/"
                target="blanck_"
              >
                <AiOutlineInstagram
                  size={25}
                  className="cursor-pointer hover:text-black/70 ease-in-out duration-200"
                />
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/cart">
                <a>
                  <AiOutlineShoppingCart size={25} className="cursor-pointer" />
                </a>
              </Link>

              {/* {cart.cartItems.length > 0 && (
                <div className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                  {CartitemCount}
                </div>
              )} */}
            </div>

            {status === "loading" ? (
              "Loading..."
            ) : session?.user ? (
              <Menu as="div" className="relative inline-block">
                <Menu.Button className="text-blue-600">
                  {session.user.name}
                </Menu.Button>
                <Menu.Items className="absolute  right-0 w-56 origin-top-right shadow-lg bg-white rounded-xl overflow-hidden">
                  <Menu.Item>
                    <DropdownLink className="dropdown-link" href="/profile">
                      Profile
                    </DropdownLink>
                  </Menu.Item>
                  <Menu.Item>
                    <DropdownLink
                      className="dropdown-link"
                      href="/Order-History"
                    >
                      Oreder History
                    </DropdownLink>
                  </Menu.Item>
                  {session.user.isAdmin && (
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/admin/dashboard"
                      >
                        Admin Dashboard
                      </DropdownLink>
                    </Menu.Item>
                  )}
                  <Menu.Item>
                    <a
                      className="dropdown-link"
                      href="#"
                      onClick={logoutClickHandler}
                    >
                      Logout
                    </a>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : (
              <Link href="/login">
                <h1 className="cursor-pointer hover:text-black/70 ">Login</h1>
              </Link>
            )}
          </div>

          {/*menu icon * small screen */}
          <div className="block md:hidden z-30">
            {openNav ? (
              <AiOutlineClose
                size={25}
                className="cursor-pointer z-30"
                onClick={openNavHandler}
              />
            ) : (
              <AiOutlineMenu
                size={25}
                className="cursor-pointer z-30"
                onClick={openNavHandler}
              />
            )}
          </div>
          <div
            className={
              openNav
                ? "fixed flex-col items-center text-center gap-8 py-[80px] top-0 right-0 flex md:hidden h-screen w-[70%] bg-white tra translate-x-0 z-20"
                : "fixed flex-col items-center text-center gap-8 py-[80px] top-0 right-0 flex md:hidden h-screen w-[70%] bg-white translate-x-[100%] z-20"
            }
          >
            <ul className="flex flex-col text-xl justify-between items-center w-full">
              <li className="cursor-pointer hover:text-black/75 hover:bg-white ease-in-out duration-200 w-full py-4">
                <Link href="/">Home</Link>
              </li>
              <li className="cursor-pointer hover:text-black/75 hover:bg-white ease-in-out duration-200 w-full py-4">
                New Arrivals
              </li>
              <li className="cursor-pointer hover:text-black/75 hover:bg-white ease-in-out duration-200 w-full py-4">
                Men
              </li>
              <li className="cursor-pointer hover:text-black/75 hover:bg-white ease-in-out duration-200 w-full py-4">
                Women
              </li>
              <li className="cursor-pointer hover:text-black/75 hover:bg-white ease-in-out duration-200 w-full py-4">
                Contact
              </li>
            </ul>
            <div className="items-center flex-col justify-between gap-8 md:hidden flex w-12">
              <div className="flex gap-4 items-center justify-center border-b-[2px]  pb-8 w-full">
                <a
                  href="https://www.instagram.com/boutique_chamsou_213/"
                  target="blacnk_"
                >
                  <AiOutlineInstagram
                    size={25}
                    className="cursor-pointer hover:text-black/70 "
                  />
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/cart">
                  <div>
                    <AiOutlineShoppingCart
                      size={25}
                      className="cursor-pointer hover:text-black/70 "
                    />
                  </div>
                </Link>
                {CartitemCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {CartitemCount}
                  </span>
                )}
                {status === "loading" ? (
                  "Loading..."
                ) : session?.user ? (
                  <Menu as="div" className="relative inline-block">
                    <Menu.Button className="Link">
                      {session.user.name}
                    </Menu.Button>
                    <Menu.Items className="absolute bottom-10 right-0 w-56 origin-top-right shadow-lg bg-white rounded-xl overflow-hidden">
                      <Menu.Item>
                        <DropdownLink className="dropdown-link" href="/profile">
                          Profile
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/Order-History"
                        >
                          Oreder History
                        </DropdownLink>
                      </Menu.Item>
                      {session.user.isAdmin && (
                        <Menu.Item>
                          <DropdownLink
                            className="dropdown-link"
                            href="/admin/dashboard"
                          >
                            Admin Dashboard
                          </DropdownLink>
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        <a
                          className="dropdown-link"
                          href="#"
                          onClick={logoutClickHandler}
                        >
                          Logout
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                ) : (
                  <Link href="/login">
                    <h1 className="cursor-pointer hover:text-black/70 ">
                      Login
                    </h1>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {openNav ? (
            <div className="absolute h-screen w-full z-[5] bg-black/25 top-0 left-0 duration-200"></div>
          ) : (
            <div className="absolute h-screen w-full z-[5] bg-black/25 top-0 left-0 ease-in-out duration-200 hidden"></div>
          )}
        </div>
      </header>

      {/* main section  */}
      <main>{children}</main>
      {/* <footer className="relative flex flex-col  justify-center px-10 items-center bottom-0 left-0 w-full h-[80px] border-t bg-white">
        <h1 className="text-xs border-b-2 pb-2">
          ?? 2022 Chamsou All Rights Reserved
        </h1>
        <div className="text-xs pt-2 flex ">
          Developed by
          <h1 className="Link">
            <Link href="https://www.instagram.com/moncef_mhz/">Moncef_mhz</Link>
          </h1>
        </div>
      </footer> */}
    </>
  );
};

export default Layout;
