/* eslint-disable react/jsx-key */
import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);

  const totalCartAmmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address />
        <div className="flex flex-col gap-4">
          {
            // eslint-disable-next-line react/jsx-key
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items.map((item) => (
                  <UserCartItemsContent cartItem={item} />
                ))
              : null
          }

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹{totalCartAmmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button className="w-full">Checkout with Paypal</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
