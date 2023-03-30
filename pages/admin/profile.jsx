import AddProduct from "@/components/admin/AddProduct";
import Category from "@/components/admin/Category";
import Footer from "@/components/admin/Footer";
import Order from "@/components/admin/Order";
import Product from "@/components/admin/Product";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import userPp from "../../images/user/admin.jpg";
const Profile = () => {
  const [tabs, setTabs] = useState(0);
  const [isProductModal, setIsProductModal] = useState(false);
  const { push } = useRouter();
  const exitAdminAccount = async () => {
    try {
      if (confirm("Are you sure you want to close admin profile?")) {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
        if (res.status === 200) {
          push("/admin");
          toast.dark("Admin Account Closed!");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleProductModal = () => {
    setIsProductModal(true);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row w-full items-center py-5 gap-x-5">
        <div className="border md:w-72  rounded flex-shrink-0 w-full">
          <div id="adminInfo" className="w-full grid place-items-center mb-5">
            <div id="photo" className="relative w-28 h-28 mt-5 s">
              <Image
                src={userPp}
                alt={"user"}
                className="object-cover rounded-full "
                fill
              />
            </div>
            <div id="name" className="text-2xl mt-1 font-bold">
              Admin
            </div>
          </div>
          <ul className=" font-semibold">
            <li
              className={`${tabs === 0 && "bg-primary text-white"}`}
              onClick={() => setTabs(0)}
            >
              <button className="btn-primary-outline">
                <i className="fa-solid fa-bowl-food"></i> Products
              </button>
            </li>
            <li
              className={`${tabs === 1 && "bg-primary text-white"}`}
              onClick={() => setTabs(1)}
            >
              <button className="btn-primary-outline">
                <i className="fa-solid fa-money-bill-transfer"></i> Orders
              </button>
            </li>
            <li
              className={`${tabs === 2 && "bg-primary text-white"}`}
              onClick={() => setTabs(2)}
            >
              <button className="btn-primary-outline">
                <i className="fa-solid fa-network-wired"></i> Categories
              </button>
            </li>
            <li
              className={`${tabs === 3 && "bg-primary text-white"}`}
              onClick={() => setTabs(3)}
            >
              <button className="btn-primary-outline">
                <i className="fa-solid fa-list"></i> Footer
              </button>
            </li>

            <li onClick={handleProductModal}>
              <button className="btn-primary-outline">
                <i className="fa-solid fa-plus"></i> Add Product
              </button>
            </li>
            <li
              className={`${tabs === 5 && "bg-primary text-white"}`}
              onClick={exitAdminAccount}
            >
              <button className="btn-primary-outline">
                <i className="fa-solid fa-right-from-bracket mr-1"></i> Exit
              </button>
            </li>
          </ul>
        </div>
        <div className="w-full">
          {tabs === 0 && <Product />}
          {tabs === 1 && <Order />}
          {tabs === 2 && <Category />}
          {tabs === 3 && <Footer />}
          {isProductModal && (
            <AddProduct setIsProductModal={setIsProductModal} />
          )}
        </div>
      </div>
    </div>
  );
};
//cookie temizlenince admin login sayfasına atar
export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token !== process.env.ADMIN_TOKEN) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default Profile;
