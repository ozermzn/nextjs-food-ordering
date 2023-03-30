import Image from "next/image";
import { useEffect, useState } from "react";
import Title from "../ui/Title";
import productImage from "../../images/f1.png";
import axios from "axios";
import { toast } from "react-toastify";
const Product = () => {
  const [products, setProducts] = useState([]);
  const pricesSize = ["Small", "Medium", "Large"];

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const handleDelete = (id) => {
    try {
      if (confirm("Are you sure delete this product?")) {
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
        setProducts(products.filter((product) => product._id !== id));
        if (res.status === 200) {
          toast.success("Product is deleted!");
          getProducts();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {products.length === 0 ? (
        <div className="grid place-items-center">
          <i className="fa-solid fa-spinner animate-spin fa-2xl"></i>
        </div>
      ) : (
        <div>
          <Title className={"text-center text-[40px]"}>Products</Title>

          <div className="overflow-auto sm:w-full w-[400px] max-h-[300px] ">
            <table className="sm:w-full text-sm text-center text-gray-500 ">
              <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Image
                  </th>
                  <th scope="col" className="py-3 px-6">
                    ID
                  </th>
                  <th scope="col" className="py-3 px-6">
                    TITLE
                  </th>
                  <th scope="col" className="py-3 px-6">
                    PRICE
                  </th>
                  <th scope="col" className="py-3 px-6">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product) => (
                    <tr
                      key={product._id}
                      className="relative bg-secondary hover:bg-primary hover:text-white text-center transition-all"
                    >
                      <td className="py-4 px-6 font-medium whitespace-nowrap relative">
                        <Image
                          src={product.img}
                          alt=""
                          width={50}
                          height={50}
                          className="object-contain w-12 h-12"
                        />
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap">
                        {product._id.substring(0, 5)}...
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap">
                        {product.title}
                      </td>
                      <td className="py-4 px-6 flex flex-col items-center font-medium whitespace-nowrap">
                        {product.prices.map((price, index) => (
                          <div key={price}>
                            <span className="font-bold">
                              {pricesSize[index]}{" "}
                            </span>
                            <span>{price}$ </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:opacity-70"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
