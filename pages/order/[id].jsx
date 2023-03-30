import Image from "next/image";
import bake from "../../images/order/bake.png";
import bike from "../../images/order/bike.png";
import delivered from "../../images/order/delivered.png";
import paid from "../../images/order/paid.png";
import axios from "axios";
const Order = ({ order }) => {
  const status = order?.status;
  function statusClass(index) {
    if (index - status < 1) return "";
    if (index - status === 1) return "animate-bounce";
    if (index - status > 1) return "";
  }

  return (
    <div className="flex justify-between items-center flex-col">
      <div className=" flex items-center justify-between w-full p-5 flex-1 min-w-[calc(100vw_-_350px)] overflow-x-auto">
        <table className="w-full text-sm text-center text-gray-500 min-w-[1000px] ">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                ORDER ID
              </th>
              <th scope="col" className="py-3 px-6">
                CUSTOMER
              </th>
              <th scope="col" className="py-3 px-6">
                ADDRESS
              </th>
              <th scope="col" className="py-3 px-6">
                TOTAL
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="relative bg-secondary hover:bg-primary hover:text-white text-center transition-all">
              <td className="py-4 px-6 font-medium whitespace-nowrap">
                <span>{order?._id}</span>
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap">
                {order?.customer}
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap">
                {order?.address}
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap">
                {order?.total}$
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="p-5 w-full">
        <div className="flex flex-wrap gap-x-2 w-full justify-between py-3 px-5 bg-primary rounded-md font-semibold ">
          <div className="grid place-items-center">
            <div>
              <div className={`relative w-10 h-10 ${statusClass(0)}`}>
                <Image src={paid} alt="paid" fill />
              </div>
              <div>Paid</div>
            </div>
          </div>

          <div className="grid place-items-center  ">
            <div className={`relative w-10 h-10 ${statusClass(1)}`}>
              <Image src={bake} alt="paid" fill />
            </div>
            <div>Baking</div>
          </div>
          <div className="grid place-items-center">
            <div className={`relative w-10 h-10 ${statusClass(2)}`}>
              <Image src={bike} alt="paid" fill />
            </div>
            <div>On the way</div>
          </div>
          <div className="grid place-items-center">
            <div className={`relative w-10 h-10 ${statusClass(3)}`}>
              <Image src={delivered} alt="paid" fill />
            </div>
            <div>Delivered</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`
  );
  return {
    props: {
      order: res?.data ? res.data : [],
    },
  };
}

export default Order;
