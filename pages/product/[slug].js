/*eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";

import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Store } from "../../utils/Store";
import db from "../../utils/db";
import Product from "../../models/Product";
import axios from "axios";
import { toast } from "react-toastify";

const ProductScreen = (props) => {
  const { product } = props;
  const [Size, SetSize] = useState("");
  const [Save, SetSave] = useState(false);
  const { state, dispatch } = useContext(Store);

  const router = useRouter();
  if (!product) {
    return (
      <Layout
        title="Product Not Found"
        className="absolute top-0 left-0 -z-10 h-screen w-full flex items-center justify-center text-3xl bg-[#161616] text-white"
      >
        Product Not Found{" "}
        <Link href="/">
          <a> Retrun</a>
        </Link>
      </Layout>
    );
  }

  const SizeHandler = (e) => {
    SetSize(e.target.value);
  };

  const SaveHandler = () => {
    SetSave(!Save);
  };
  const AddToCartHandler = async () => {
    const existItem = state.cart.cartItems.find(
      (item) => item.Slug === product.Slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.CountInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity, Size },
    });
    router.push("/cart");
  };

  return (
    <Layout title={product.Name}>
      <div className=" absolute left-0 top-0 md:top-10 z-10 w-full h-screen  flex md:items-center md:py-10 md:px-20 md:justify-between md:gap-5 flex-col md:flex-row">
        <img
          src={product.Image}
          alt={product.Slug}
          className="w-full md:w-[800px] md:h-[500px] "
        />
        <div className="p-5 flex flex-col h-full gap-6 md:gap-1 w-full bg-white rounded-t-3xl md:rounded-none">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-3xl font-bold text-[#161616]">
              {product.Name}
            </h1>
            <h1 className="text-xl text-white px-4 font-light bg-[#161616] rounded-full">
              {product.Price} da
            </h1>
          </div>
          <h1 className="text-xl font-semibold text-[#161616]">
            Brand: {product.Brand}
          </h1>
          <h1 className="text-xl font-semibold text-[#161616]">Size:</h1>
          <div className="flex flex-row gap-2  w-full justify-evenly">
            {product.Taille.map((Element) => {
              return (
                <button
                  onClick={SizeHandler}
                  value={Element}
                  key={Element}
                  className={
                    Size === Element
                      ? "border-2 border-[#161616] p-3 text-xl rounded-xl hover:bg-[#161616] hover:text-white bg-[#161616] text-white"
                      : "border-2 border-[#161616] p-3 text-xl rounded-xl hover:bg-[#161616] hover:text-white "
                  }
                >
                  {Element}
                </button>
              );
            })}
          </div>

          <p className="text-sm text-[#161616]/75">{product.Descreption}</p>

          <div className="flex items-center gap-10 justify-evenly">
            <button
              className="w-full bg-[#161616] rounded-lg py-2 text-white flex items-center justify-center gap-5 text-xl"
              onClick={AddToCartHandler}
            >
              Add to cart <AiOutlineShoppingCart size={25} />
            </button>
            <div onClick={SaveHandler}>
              {Save ? (
                <AiFillHeart size={25} color="#F0423C" />
              ) : (
                <AiOutlineHeart size={25} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductScreen;

export async function getServerSideProps(context) {
  const { params } = context;
  const { Slug } = params;

  await db.connect();
  const product = await Product.findOne({ Slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
