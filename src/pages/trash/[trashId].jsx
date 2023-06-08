import { useRouter } from "next/router";
import trashMap from "@/../fakerData.json";
import { useEffect, useState } from "react";
import TrashCard from "@/component/TrashCard";
import { db } from "@/../firebase";
import { getDoc, doc } from "firebase/firestore";
import { BsFillCartPlusFill } from "react-icons/bs";
import Navbar from "@/component/Navbar";

const SectionCard = ({ title, value }) => {
  return (
    <p>
      {title}: <span className="text-lg">{value}</span>
    </p>
  );
};
const TrashId = () => {
  const router = useRouter();
  const { trashId } = router.query;
  const [data, setData] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const getTrash = async () => {
    try {
      const trashRef = doc(db, "trash", trashId);
      const trashSnap = await getDoc(trashRef);
      if (trashSnap.exists()) {
        setData(trashSnap.data());
        console.log(trashSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err);
    }
  };

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

  useEffect(() => {
    return getTrash();
  }, []);
  return (
    <div>
      <Navbar />
      {data && (
        <>
          <div className="grid grid-cols-2 gap-x-4">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.image} alt="" />
            </div>
            <div>
              <SectionCard title="Name" value={data.name} />
              {/* <SectionCard title="Price" value={data.price} /> */}
              <SectionCard title="Seller" value={data.seller} />
              {data.desc && (
                <SectionCard title="Description" value={data.desc} />
              )}
              <button
                onClick={addToCart}
                className="p-3 bg-[#397DE3] rounded-full flex items-center justify-center text-white"
              >
                {isInCart ? "+" : <BsFillCartPlusFill />}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TrashId;
