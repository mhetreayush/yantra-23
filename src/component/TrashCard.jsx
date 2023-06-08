import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";

const TrashCard = ({
  name,
  price,
  seller,
  byProducts,
  trashId,
  quantity,
  expiry,
  image,
}) => {
  // const router = useRouter();
  // const { trashId } = router.query;
  const [isInCart, setIsInCart] = useState(false);
  const checkIsInCart = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartArr = JSON.parse(cart);
      const trashIdArr = cartArr.map((item) => item.trashId);
      if (trashIdArr.includes(trashId)) {
        setIsInCart(true);
      }
    }
  };
  useEffect(() => {
    checkIsInCart();
  }, []);
  const addToCart = () => {
    const cart = localStorage.getItem("cart");
    console.log("Here: ", trashId);
    if (cart) {
      const cartArr = JSON.parse(cart);
      const trashIdArr = cartArr.map((item) => item.trashId);
      if (!trashIdArr.includes(trashId)) {
        const newCart = [
          ...cartArr,
          {
            trashId,
            quantity: 1,
          },
        ];
        localStorage.setItem("cart", JSON.stringify(newCart));
      } else {
        const newCart = cartArr.map((item) => {
          if (item.trashId === trashId) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([
          {
            trashId,
            quantity: 1,
          },
        ])
      );
    }
    checkIsInCart();
  };

  return (
    <div className="rounded-md grid grid-cols-6 border-black border bg-[#FDFDFD]">
      <div className="col-span-2 border-r border-black flex items-center justify-center w-full">
        {/*  eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="object-contain " />
      </div>
      <div className="col-span-4 p-4 flex flex-col justify-between w-full">
        <div>
          <h1 className="text-lg">{name}</h1>
          <p>Quantity: {quantity}</p>
          <p>Expiry date: {expiry}</p>
        </div>
        <div className="flex justify-between w-full mt-4">
          <div>
            <p className="text-sm">Sold by:</p>
            <h1>{seller}</h1>
          </div>
          <div className="flex gap-x-2">
            <Link
              href={`/trash/${trashId}`}
              className="p-2 px-8 flex items-center justify-center bg-[#397DE3] rounded-full text-white"
            >
              Open
            </Link>
            <button
              onClick={addToCart}
              className="p-3 bg-[#397DE3] rounded-full flex items-center justify-center text-white"
            >
              {isInCart ? "+" : <BsFillCartPlusFill />}
            </button>
          </div>
        </div>
        {/* <p>{name}</p> */}
      </div>
    </div>
  );
};

export default TrashCard;
