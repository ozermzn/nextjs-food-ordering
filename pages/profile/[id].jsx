import Image from "next/image";
import React, { useEffect, useState } from "react";
import userPp from "../../images/user/user.png";
import Account from "@/components/profile/Account";
import Password from "@/components/profile/Password";
import Order from "@/components/profile/Order";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
const Profile = ({ user }) => {
  const { data: session } = useSession();
  const [tabs, setTabs] = useState(0);
  const { push } = useRouter();
  const handleSignOut = () => {
    if (confirm("Are you sure want to sign out?")) {
      signOut({ redirect: false });
      push("/auth/login");
    }
  };
  // useEffect(() => {
  //   if (!session) {
  //     push("/auth/login");
  //   }
  // }, [session, push]);
  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row items-center py-5">
        <div className="border md:w-72  rounded flex-shrink-0 w-full">
          <div id="adminInfo" className="w-full grid place-items-center mb-5">
            <div id="photo" className="relative w-28 h-28 mt-5 s">
              <Image
                src={user?.image ? user.image : userPp}
                alt={"user"}
                className="object-cover rounded-full"
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
                priority
                fill
              />
            </div>
            <div id="name" className="text-2xl mt-1 font-bold">
              {user.name}
            </div>
          </div>
          <ul className=" font-semibold">
            <li
              className={`${tabs === 0 && "bg-primary text-white"}`}
              onClick={() => setTabs(0)}
            >
              <button className="btn-primary-outline">
                <i className="fa-solid fa-house"></i> Account
              </button>
            </li>
            <li
              className={`${tabs === 1 && "bg-primary text-white"}`}
              onClick={() => setTabs(1)}
            >
              <button className="btn-primary-outline">
                <i className="fa-solid fa-key"></i> Password
              </button>
            </li>
            <li
              className={`${tabs === 2 && "bg-primary text-white"}`}
              onClick={() => setTabs(2)}
            >
              <button className="btn-primary-outline">
                <i className="fa-solid fa-money-bill-transfer"></i> Orders
              </button>
            </li>
            <li onClick={handleSignOut}>
              <button className="btn-primary-outline">
                <i className="fa-solid fa-right-from-bracket mr-1"></i> Exit
              </button>
            </li>
          </ul>
        </div>
        {tabs === 0 && <Account user={user} />}
        {tabs === 1 && <Password user={user} />}
        {tabs === 2 && <Order />}
      </div>
    </div>
  );
};
export async function getServerSideProps({ req, params }) {
  const user = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`
  );

  return {
    props: {
      user: user ? user.data : null,
    },
  };
}

export default Profile;
