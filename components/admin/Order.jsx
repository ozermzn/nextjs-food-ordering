import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Title from "../ui/Title";

const Order = () => {
  const [orders, setOrders] = useState([]);

  const status = ["Baking", "On the way", "Delivered"];

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`
        );
        setOrders(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);
  async function handleStatusUpdate(id) {
    const item = orders.find((order) => order._id === id);
    const currentStatus = item.status;
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
        { status: currentStatus + 1 }
      );
      if (res.status === 200) {
        toast.success("Successfully");
        setOrders([res.data, ...orders.filter((order) => order._id !== id)]);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="">
      <Title className={"text-center text-[40px]"}>Orders</Title>

      {orders.length === 0 ? (
        <div className="grid place-items-center w-full h-full mt-10">
          <i className="fa-solid fa-spinner animate-spin fa-2xl"></i>
        </div>
      ) : (
        <div className="lg:w-full overflow-auto md:w-[500px]">
          <table className="w-full text-sm text-center text-gray-500 my-10 ">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="py-3 px-6">
                  PRODUCT ID
                </th>
                <th scope="col" className="py-3 px-6">
                  CUSTOMER
                </th>
                <th scope="col" className="py-3 px-6">
                  TOTAL
                </th>
                <th scope="col" className="py-3 px-6">
                  PAYMENT
                </th>
                <th scope="col" className="py-3 px-6">
                  STATUS
                </th>
                <th scope="col" className="py-3 px-6">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((order) => (
                    <tr
                      key={order._id}
                      className="relative bg-secondary hover:bg-primary hover:text-white text-center transition-all"
                    >
                      <td className="py-4 px-6 font-medium whitespace-nowrap relative">
                        {order?._id.substring(0, 6)}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap">
                        {order?.customer}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap">
                        {order?.total}$
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap">
                        {order?.paymentMethod === 0 ? "Cash" : "Credit Card"}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap">
                        {status[order?.status]}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap">
                        {order?.status > 1 ? (
                          <button
                            disabled
                            className="btn-primary !bg-gray-600 pointer-events-none opacity-70"
                          >
                            Next Stage
                          </button>
                        ) : (
                          <button
                            className="btn-primary !bg-green-500"
                            onClick={() => handleStatusUpdate(order?._id)}
                          >
                            Next Stage
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Order;
