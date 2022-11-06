import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Layout from "../../../components/layout";
import { getError } from "../../../utils/error";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, errorUpdate: "" };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false, errorUpdate: "" };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}
export default function AdminProductEditScreen() {
  const { query } = useRouter();
  const productId = query.id;
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/products/${productId}`);
        dispatch({ type: "FETCH_SUCCESS" });
        setValue("Name", data.Name);
        setValue("Slug", data.Slug);
        setValue("Price", data.Price);
        setValue("Image", data.Image);
        setValue("Categories", data.Categories);
        setValue("Taille", data.Taille);
        setValue("Brand", data.Brand);
        setValue("CountInStock", data.CountInStock);
        setValue("Descreption", data.Descreption);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, [productId, setValue]);

  const router = useRouter();

  // const uploadHandler = async (e, ImageField = "Image") => {
  //   const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
  //   try {
  //     dispatch({ type: "UPLOAD_REQUEST" });
  //     const {
  //       data: { signature, timestamp },
  //     } = await axios("/api/admin/cloudinary-sign");

  //     const file = e.target.files[0];
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("signature", signature);
  //     formData.append("timestamp", timestamp);
  //     formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
  //     const { data } = await axios.post(url, formData);
  //     dispatch({ type: "UPLOAD_SUCCESS" });
  //     setValue(ImageField, data.secure_url);
  //     toast.success("File uploaded successfully");
  //   } catch (err) {
  //     dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
  //     toast.error(getError(err));
  //   }
  // };

  const submitHandler = async ({
    Name,
    Slug,
    Price,
    Categories,
    taille,
    Image,
    Brand,
    CountInStock,
    Descreption,
  }) => {
    var Taille = taille.split(",");
    console.log(Taille);
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`/api/admin/products/${productId}`, {
        Name,
        Slug,
        Price,
        Categories,
        Taille,
        Image,
        Brand,
        CountInStock,
        Descreption,
      });
      dispatch({ type: "UPDATE_SUCCESS" });
      toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title={`Edit Product ${productId}`}>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/orders">Orders</Link>
            </li>
            <li>
              <Link href="/admin/products">
                <a className="font-bold">Products</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <form
              className="mx-auto max-w-screen-md"
              onSubmit={handleSubmit(submitHandler)}
            >
              <h1 className="mb-4 text-xl">{`Edit Product ${productId}`}</h1>
              <div className="mb-4">
                <label htmlFor="Name">Name</label>
                <input
                  type="text"
                  className="w-full"
                  id="Name"
                  autoFocus
                  {...register("Name", {
                    required: "Please enter name",
                  })}
                />
                {errors.Name && (
                  <div className="text-red-500">{errors.Name.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="Slug">Slug</label>
                <input
                  type="text"
                  className="w-full"
                  id="Slug"
                  {...register("Slug", {
                    required: "Please enter slug",
                  })}
                />
                {errors.Slug && (
                  <div className="text-red-500">{errors.Slug.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="Price">Price</label>
                <input
                  type="text"
                  className="w-full"
                  id="Price"
                  {...register("Price", {
                    required: "Please enter Price",
                  })}
                />
                {errors.Price && (
                  <div className="text-red-500">{errors.Price.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="Image">Image</label>
                <input
                  type="text"
                  className="w-full"
                  id="Image"
                  {...register("Image", {
                    required: "Please enter Image",
                  })}
                />
                {errors.Image && (
                  <div className="text-red-500">{errors.Image.message}</div>
                )}
              </div>
              {/* <div className="mb-4">
                <label htmlFor="ImageFile">Upload Image</label>
                <input
                  type="file"
                  className="w-full"
                  id="ImageFile"
                  onChange={uploadHandler}
                />

                {loadingUpload && <div>Uploading....</div>}
              </div> */}
              <div className="mb-4">
                <label htmlFor="taille">taille</label>
                <input
                  type="text"
                  className="w-full"
                  id="taille"
                  {...register("taille", {
                    required: "Please enter taille",
                  })}
                />
                {errors.taille && (
                  <div className="text-red-500">{errors.taille.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="Categories">category</label>
                <input
                  type="text"
                  className="w-full"
                  id="Categories"
                  {...register("Categories", {
                    required: "Please enter category",
                  })}
                />
                {errors.Categories && (
                  <div className="text-red-500">
                    {errors.Categories.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="Brand">Brand</label>
                <input
                  type="text"
                  className="w-full"
                  id="Brand"
                  {...register("Brand", {
                    required: "Please enter Brand",
                  })}
                />
                {errors.Brand && (
                  <div className="text-red-500">{errors.Brand.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="CountInStock">CountInStock</label>
                <input
                  type="text"
                  className="w-full"
                  id="CountInStock"
                  {...register("CountInStock", {
                    required: "Please enter CountInStock",
                  })}
                />
                {errors.CountInStock && (
                  <div className="text-red-500">
                    {errors.CountInStock.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="Descreption">Descreption</label>
                <input
                  type="text"
                  className="w-full"
                  id="Descreption"
                  {...register("Descreption", {
                    required: "Please enter Descreption",
                  })}
                />
                {errors.Descreption && (
                  <div className="text-red-500">
                    {errors.Descreption.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <button disabled={loadingUpdate} className="primary-button">
                  {loadingUpdate ? "Loading" : "Update"}
                </button>
              </div>
              <div className="mb-4">
                <Link href={`/admin/products`}>Back</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminProductEditScreen.auth = { adminOnly: true };
