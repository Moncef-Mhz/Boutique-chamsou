import Layout from "../components/layout";
import ProductItem from "../components/productItem";
import Product from "../models/Product";
import db from "../utils/db";

const index = ({ product }) => {
  return (
    <Layout title="Home page">
      <div className="p-5 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 bg-white">
        {product.map((product) => (
          <ProductItem product={product} key={product.Slug} />
        ))}
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      product: products.map(db.convertDocToObj),
    },
  };
}

export default index;
