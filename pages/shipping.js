import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/layout";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";

const ShippingScreen = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("wilaya", shippingAddress.wilaya);
    setValue("phoneNumber", shippingAddress.phoneNumber);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, wilaya, phoneNumber }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, wilaya, phoneNumber },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          wilaya,
          phoneNumber,
        },
      })
    );

    router.push("/placeorder");
  };

  return (
    <Layout title="shipping Address">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl text-center">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">FullName</label>
          <input
            className="w-full"
            id="fullName"
            autoFocus
            {...register("fullName", {
              required: "Please enter full name",
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber">Phone number</label>
          <input
            className="w-full"
            id="phoneNumber"
            autoFocus
            {...register("phoneNumber", {
              required: "Please enter your phone number",
              minLenght: { value: 10, message: "phone number is 10 numbers" },
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="wilaya">wilaya</label>
          <input
            className="w-full"
            id="wilaya"
            {...register("wilaya", {
              required: "Please enter wilaya",
            })}
          />
          {errors.wilaya && (
            <div className="text-red-500 ">{errors.wilaya.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            className="w-full"
            id="address"
            {...register("address", {
              required: "Please enter address",
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>

        <div className="mb-4 flex justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
};

ShippingScreen.auth = true;

export default ShippingScreen;
