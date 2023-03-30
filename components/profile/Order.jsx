import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Title from "../ui/Title";

const Order = () => {
  const status = ["Preparing", "On the way", "Delivered"];
  const [orders, setOrders] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`
        );
        setOrders(
          response.data.filter(
            (order) => order?.customer === session.user?.name
          )
        );
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, [session]);

  return (
    <div className="container mx-auto px-5">
      <Title className={"m-5 md:text-start text-center text-[40px]"}>
        Orders
      </Title>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm text-center xl:min-w-[1000px] min-w-100% text-gray-500 ">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                ID
              </th>
              <th scope="col" className="py-3 px-6">
                ADDRESS
              </th>
              <th scope="col" className="py-3 px-6">
                DATE
              </th>
              <th scope="col" className="py-3 px-6">
                TOTAL
              </th>
              <th scope="col" className="py-3 px-6">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr
                  key={order?._id}
                  className="relative bg-secondary hover:bg-primary hover:text-white text-center transition-all"
                >
                  <td className="py-4 px-6 font-medium whitespace-nowrap">
                    <span>{order?._id}</span>
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap">
                    {order?.address}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap">
                    {order?.updatedAt.slice(0, 10)}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap">
                    {order?.total}$
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap">
                    {status[order?.status]}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
