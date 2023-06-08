import TrashCard from "@/component/TrashCard";
import { useEffect, useState } from "react";
import trashMap from "@/../fakerData.json";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/../firebase";
const Cart = () => {
  const [cart, setCart] = useState([]);

  const setCartData = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartData = JSON.parse(cart);
      cartData.map(async (trash) => {
        console.log(trash);
        try {
          const trashDoc = doc(db, "trash", trash.trashId);
          const trashSnap = await getDoc(trashDoc);
          if (trashSnap.exists()) {
            setCart((prev) => [
              ...prev,
              { ...trashSnap.data(), cartQuantity: trash.quantity },
            ]);
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
  };

  useEffect(() => {
    return setCartData();
  }, []);
  const handleBuy = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };
  return (
    <div>
      {cart.length > 0 && (
        <>
          {cart.map((trash, idx) => (
            <>
              <TrashCard key={idx} {...trash} />
              <hr />
              Quantity: {trash.cartQuantity}
            </>
          ))}
          <button onClick={handleBuy}>Buy Now</button>
        </>
      )}
    </div>
  );
};

export default Cart;
