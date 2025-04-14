import React, { useEffect, useRef } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxhooks";
import { clearCart ,removeItem} from "../../store/slices/cartSlice";


// Define the cart item type
interface CartItem {
  id:  number;
  name: string;
  quantity: number;
  price: number;
}

const initialCartData: CartItem[] = [

];

const CartInfo: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  // const [cartData, setCartData] = React.useState<CartItem[]>(initialCartData);
  const dispatch = useAppDispatch();
  const cartData= useAppSelector((state) => state.cartReducer.items);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [cartData]);

  const handleRemove = (itemId: number) => {
    dispatch(removeItem(itemId));
  };

  return (
    <div className="px-2 sm:px-4 py-2">
      <h1 className="text-lg sm:text-xl text-[#e4e4e4] font-semibold tracking-wide">
        Order Details
      </h1>

      <div
        className="mt-4 overflow-y-auto scrollbar-hide max-h-[380px] min-h-[200px] border border-[#333] rounded-lg p-2"
        ref={scrollRef}
      >
        {cartData.length === 0 ? (
          <p className="text-[#ababab] text-sm flex justify-center items-center h-[100px] sm:h-[150px]">
            Your cart is empty. Start adding items!
          </p>
        ) : (
          cartData.map((item) => (
            <div
              key={item.id}
              className="bg-[#1f1f1f] rounded-lg px-3 py-4 mb-2 sm:mb-3"
            >
              <div className="flex flex-wrap items-center justify-between">
                <h1 className="text-[#ababab] font-semibold tracking-wide text-sm sm:text-md">
                  {item.name}
                </h1>
                <p className="text-[#ababab] font-semibold text-xs sm:text-sm">
                  x{item.quantity}
                </p>
              </div>
              <div className="flex items-center justify-between mt-2 sm:mt-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <RiDeleteBin2Fill
                    onClick={() => handleRemove(item.id)}
                    className="text-[#ababab] cursor-pointer hover:text-red-500 transition"
                    size={18}
                  />
                  <FaNotesMedical
                    className="text-[#ababab] cursor-pointer hover:text-blue-400 transition"
                    size={18}
                  />
                </div>
                <p className="text-[#f5f5f5] text-sm sm:text-md font-bold">
                  ₹{item.price}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartInfo;
