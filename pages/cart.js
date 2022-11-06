/*eslint-disable @next/next/no-img-element */

import Link from "next/link";
import React, { useContext } from "react";
import Layout from "../components/layout";
import { AiOutlineDelete } from "react-icons/ai";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "react-toastify";

const CartScreen = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const UpdateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.CountInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    toast.success("Product updated in the cart");
  };
  return (
    <Layout title="Shopping Cart">
      <div className="p-5">
        <h1 className="mb-4 text-xl text-center">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div>
            Cart is eampty.<Link href="/">Go shopping</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Size</th>
                    <th className="p-5 text-tight">Price</th>
                    <th className="p-5 ">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.Slug} className="border-b">
                      <td>
                        <Link href={`/product/${item.Slug}`}>
                          <a className="flex items-center">
                            <img
                              src={item.Image}
                              alt={item.Name}
                              className="w-[50px] h-[50px]"
                            />
                            {item.Name}
                          </a>
                        </Link>
                      </td>
                      <td className="p-5 text-right">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            UpdateCartHandler(item, e.target.value)
                          }
                        >
                          {[...Array(item.CountInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-5 text-center">{item.Size}</td>
                      <td className="p-5 text-center">{item.Price} da</td>
                      <td className="p-5 text-center ">
                        <button onClick={() => removeItemHandler(item)}>
                          <AiOutlineDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card p-5">
              <ul>
                <li className="pb-3 text-xl">
                  SubTotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) :{" "}
                  {cartItems.reduce((a, c) => a + c.quantity * c.Price, 0)} da
                </li>
                <button
                  onClick={() => router.push("login?redirect=/shipping")}
                  className="primary-button w-full"
                >
                  Check Out
                </button>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
