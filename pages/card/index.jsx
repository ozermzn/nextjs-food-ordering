import Title from "@/components/ui/Title";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "@/redux/store";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const Index = ({ userList }) => {
  const { data: session } = useSession();
  const card = useSelector((state) => state.card);
  const router = useRouter();

  const dispatch = useDispatch();

  const user = userList?.find((user) => user.email === session?.user?.email);
  const newOrder = {
    customer: user?.name,
    address: user?.address ? user?.address : "No address",
    total: card.total,
    status: 0,
    paymentMethod: 0,
  };

  const createOrder = async () => {
    try {
      if (session) {
        if (confirm("Are you sure approve?")) {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/orders`,
            newOrder
          );
          if (res.status === 201) {
            router.push(`/order/${res.data._id}`);
            toast.success("Order Created Successfully!", { autoClose: 1000 });
            dispatch(reset());
          }
        }
      } else {
        toast.error("Please login first,", { autoClose: 1000 });
        router.push("/auth/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center md:flex-row flex-col">
        <div className=" flex items-center justify-between w-full p-5 flex-1 min-w-[calc(100vw_-_350px)] max-h-[300px] overflow-auto">
          {card?.products?.length > 0 ? (
            <table className="w-full text-sm text-center text-gray-500 min-w-[1000px] ">
              <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    PRODUCT
                  </th>
                  <th scope="col" className="py-3 px-6">
                    EXTRAS
                  </th>
                  <th scope="col" className="py-3 px-6">
                    PRICE
                  </th>
                  <th scope="col" className="py-3 px-6">
                    QUANTITY
                  </th>
                </tr>
              </thead>
              <tbody>
                {card.products.map((product) => (
                  <tr
                    key={product._id}
                    className="relative bg-secondary hover:bg-primary hover:text-white transition-all"
                  >
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-3">
                      <Image
                        src={product.img}
                        alt="order"
                        width={35}
                        height={35}
                        className="object-cover"
                      />
                      <span>{product.title}</span>
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {product?.extras?.map((item) => {
                        return <span key={item._id}>{item.text} </span>;
                      })}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {product.price}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      1
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center font-bold">There is no product here.</p>
          )}
        </div>
        <div className="bg-secondary md:min-h-[calc(100vh_-_388px)] w-full  md:w-auto flex-1 flex flex-col md:text-start text-center text-white justify-center p-8">
          <Title className={"[text-40px]"}>CARD TOTAL</Title>
          <div className="flex flex-col gap-y-1 my-6">
            <span className="font-bold">
              Subtotal: <span className="font-normal">{card.total}</span>
            </span>
            <span className="font-bold">
              Discount: <span className="font-normal">0.00$</span>
            </span>
            <span className="font-bold">
              Total: <span className="font-normal">{card.total} $</span>
            </span>
          </div>
          <button className="btn-primary" onClick={createOrder}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps(context) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  return {
    props: {
      userList: res?.data ? res.data : [],
    },
  };
}
export default Index;
