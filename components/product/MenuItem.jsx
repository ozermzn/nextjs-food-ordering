import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../redux/slices/cardSlice";

const MenuItem = ({ product }) => {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.card);
  const findCard = card.products.find((item) => item._id === product._id);
  const handleClick = () => {
    dispatch(
      addProduct({
        ...product,
        extras: [{ text: "empty" }],
        price: product.prices[0],
        quantity: 1,
      })
    );
  };

  return (
    <div className="bg-secondary rounded-3xl">
      <div className="w-full bg-[#f1f2f3] h-[210px] grid place-content-center rounded-bl-[46px] rounded-t-2xl">
        <Link href={`/product/${product._id}`}>
          <div className="relative w-36 h-36 ">
            <Image
              src={product.img}
              alt="menu"
              fill
              priority
              className="hover:scale-110 transition-all object-contain"
            />
          </div>
        </Link>
      </div>
      <div className="p-[25px] text-white flex flex-col gap-4">
        <h4 className="text-xl font-semibold">{product.title}</h4>
        <p className="text-[15px]">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold">{product.prices[0]}$</span>
          <button
            className="btn-primary rounded-full !p-[13px]"
            disabled={findCard}
            onClick={handleClick}
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
