import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/layout";
import { getError } from "../utils/error";
import { Store } from "../utils/Store";

const PlaceOrderScreen = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = cartItems.reduce((a, c) => a + c.quantity * c.Price, 0);

  const shippingPrice = 500;

  const totalPrice = round2(itemsPrice + shippingPrice);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        itemsPrice,
        shippingPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: "CART_CLEAR_ITEMS" });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="oreder screen">
      <CheckoutWizard activeStep={2} />
      <h1 className="mb-4 text-xl">PlaceOrder</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div>
                <h1>
                  <span className="font-bold text-md">FullName:</span>{" "}
                  {shippingAddress.fullName}
                </h1>
                <h1>
                  <span className="font-bold text-md">PhoneNumber:</span>{" "}
                  {shippingAddress.phoneNumber}
                </h1>
                <h1>
                  <span className="font-bold text-md">Wilaya:</span>{" "}
                  {shippingAddress.wilaya}
                </h1>
                <h1>
                  <span className="font-bold text-md">Adress:</span>{" "}
                  {shippingAddress.address}
                </h1>
              </div>
              <div>
                <Link href="/shipping">Edit</Link>
              </div>
            </div>
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="    p-5 text-right">Quantity</th>
                    <th className="    p-5 text-right">Size</th>
                    <th className="  p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link href={`/product/${item.Slug}`}>
                          <a className="flex items-center">
                            <Image
                              src={item.Image}
                              alt={item.Name}
                              width={50}
                              height={50}
                            ></Image>
                            {item.Name}
                          </a>
                        </Link>
                      </td>
                      <td className=" p-5 text-right">{item.quantity}</td>
                      <td className=" p-5 text-right">{item.Size}</td>
                      <td className="p-5 text-right">{item.Price} da</td>
                      <td className="p-5 text-right">
                        {item.quantity * item.Price} da
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link href="/cart">Edit</Link>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <h2 className="mb-5 text-lg">Order Summary</h2>
            <ul>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Items</div>
                  <div>{itemsPrice} da</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Shipping</div>
                  <div>{shippingPrice} da</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>totalPrice</div>
                  <div>{totalPrice} da</div>
                </div>
              </li>
              <li>
                <button
                  className="primary-button w-full"
                  disabled={loading}
                  onClick={placeOrderHandler}
                >
                  {loading ? "Loading..." : "Place Order"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PlaceOrderScreen;

PlaceOrderScreen.auth = true;
