import { useState } from "react";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import Search from "../ui/Search";
import Title from "../ui/Title";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
const Header = () => {
  const [isSeachModal, setIsSeachModal] = useState(false);
  const [isMenuModal, setIsMenuModal] = useState(false);

  const card = useSelector((state) => state.card);

  const router = useRouter();

  return (
    <div className="">
      <div className={`h-[5.5rem] bg-secondary `}>
        <div className="container mx-auto flex text-white justify-between items-center h-full">
          <div>
            <Link href="/home">
              {" "}
              <Title>Feane</Title>
            </Link>
          </div>
          <nav
            className={`sm:static absolute top-0 left-0 grid place-items-center sm:w-auto sm:h-auto h-full  w-full text-black sm:text-white  sm:bg-transparent bg-white sm:flex font-bold z-30
            ${isMenuModal !== true && "hidden"}`}
          >
            <ul className="flex items-center uppercase gap-x-2 sm:flex-row flex-col ">
              <li
                className={`px-[5px] py-[20px] hover:text-primary cursor-pointer ${
                  router.asPath === "/" && "text-primary"
                }`}
                onClick={() => setIsMenuModal(false)}
              >
                <Link href="/">Home</Link>
              </li>
              <li
                className={`"px-[5px] py-[20px] hover:text-primary cursor-pointer ${
                  router.asPath === "/menu" && "text-primary"
                }`}
                onClick={() => setIsMenuModal(false)}
              >
                <Link href="/menu">Menu</Link>
              </li>
              <li
                className={`px-[5px] py-[20px]  hover:text-primary cursor-pointer ${
                  router.asPath === "/about" && "text-primary"
                }`}
                onClick={() => setIsMenuModal(false)}
              >
                <Link href="/about">About</Link>
              </li>
              <li
                className={`px-[5px] py-[20px] hover:text-primary cursor-pointer ${
                  router.asPath === "/reservation" && "text-primary"
                }`}
                onClick={() => setIsMenuModal(false)}
              >
                <Link href="/reservation">Book Table</Link>
              </li>
              {isMenuModal && (
                <button
                  onClick={() => {
                    setIsMenuModal(!isMenuModal);
                  }}
                  className="px-5 text-red-500 hover:opacity-70"
                >
                  <GiCancel size={23} />
                </button>
              )}
            </ul>
          </nav>
          <div className="flex gap-x-4 items-center ">
            <Link href="/auth/login">
              <FaUserAlt
                className={`hover:text-primary transition-all ${
                  (router.asPath.includes("profile") ||
                    router.asPath.includes("auth")) &&
                  "text-primary"
                }`}
              />
            </Link>
            <Link href="/card">
              <div className="relative">
                <FaShoppingCart
                  className={`hover:text-primary transition-all ${
                    router.asPath === "/card" && "text-primary"
                  }`}
                />
                <span className="absolute  left-3 bottom-3 text-xs rounded-full px-[3px] bg-danger font-bold text-white">
                  {card.products.length === 0 ? null : card.products.length}
                </span>
              </div>
            </Link>

            <button onClick={() => setIsSeachModal(!isSeachModal)}>
              <FaSearch
                className={`hover:text-primary transition-all ${
                  isSeachModal && "text-primary"
                }`}
              />
            </button>
            <a href="" className="md:inline-block hidden">
              <button className="btn-primary">Order Online</button>
            </a>
            <button>
              <GiHamburgerMenu
                onClick={() => setIsMenuModal(!isMenuModal)}
                className="text-xl hover:text-primary transition-all sm:hidden  "
              />
            </button>
          </div>
        </div>
      </div>
      <div className="">
        {isSeachModal && <Search setIsSeachModal={setIsSeachModal} />}
      </div>
    </div>
  );
};

export default Header;
