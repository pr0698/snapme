import { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { Link, Route, Routes } from "react-router-dom";

import { Sidebar, UserProfile } from "../components";
import { client } from "../client";
import Images from "../assets/image";
import { userQuery } from "../utils/data";
import { UserSanity } from "../type/user";
import Pins from "./pins";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState<UserSanity>();
  const scrollRef = useRef<any>(null);

  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? // @ts-ignore
        JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.sub);

    client.fetch(query).then((data: UserSanity[]) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef?.current.scrollTo(0, 0);
  });

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        {<Sidebar user={user} />}
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={Images.LOGO} alt="logo" className="w-28" />
          </Link>
          {user ? (
            <Link to={`user-profile/${user?._id}`}>
              <img
                src={user.image}
                alt="user-pic"
                className="w-9 h-9 rounded-full "
              />
            </Link>
          ) : (
            <Link to="login">
              <BiLogIn fontSize={40} />
            </Link>
          )}
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            {<Sidebar closeToggle={setToggleSidebar} user={user} />}
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
