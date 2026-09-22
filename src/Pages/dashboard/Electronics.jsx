import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../features/product/productSlice";
import { fetchCategories } from "../../features/category/categorySlice";
import Card from "../../Components/common/Card";
import Loading from "../../Components/common/Loading";

const Electronics = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [randomProducts, setRandomProducts] = useState([]);
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.product);

  const { categories, loading: categoriesLoading } = useSelector(
    (state) => state.category,
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const electronicsCategory = categories.find(
    (category) => category.name?.trim().toLowerCase() === "electronics",
  );

  const electronicsProducts = products.filter(
    (product) =>
      Number(product.category_id) === Number(electronicsCategory?.id),
  );

  useEffect(() => {
    if (electronicsProducts.length > 0) {
      const shuffledProducts = [...electronicsProducts].sort(
        () => Math.random() - 0.5,
      );

      setRandomProducts(shuffledProducts.slice(0, 8));
    } else {
      setRandomProducts([]);
    }
  }, [products, electronicsCategory?.id]);

  if (productsLoading || categoriesLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loading />
      </div>
    );
  }

  if (productsError) {
    return <div className="p-6 text-red-500">{productsError}</div>;
  }

  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
      {/* HEADER */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[2px] text-[#a14b0b]">
          Category
        </p>

        <h1 className="text-4xl font-bold text-[#211f1d] mt-2">Electronics</h1>

        <p className="text-[#8d8580] mt-2">
          Explore our latest electronic products
        </p>
      </div>

      {/* PRODUCTS */}
      {electronicsProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">No electronics products available.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {randomProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>

          {/* SEE MORE */}
          <div className="flex justify-center mt-12">
            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="px-8 py-3 bg-[#8b3905] text-white rounded-xl font-semibold hover:bg-[#722e04] transition"
            >
              See More
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Electronics;
