/*eslint-disable @next/next/no-img-element */
import Link from "next/link";

const ProductItem = ({ product }) => {
  return (
    <div className="card bg-white">
      <Link href={`/product/${product.Slug}`}>
        <a>
          <img
            src={product.Image}
            alt={product.Name}
            className="rounded shadow "
          />
        </a>
      </Link>
      <div className="flex flex-col justify-center gap p-5">
        <div className="flex justify-between items-center">
          <Link href={`/product/${product.Slug}`}>
            <a>
              <h2 className="text-2xl font-bold">{product.Name}</h2>
            </a>
          </Link>
          <p className="bg-[#161616] py-1 rounded-full px-2 text-white">
            {product.Price}DA
          </p>
        </div>
        <p className="mb-2">{product.Brand}</p>
      </div>
    </div>
  );
};

export default ProductItem;
