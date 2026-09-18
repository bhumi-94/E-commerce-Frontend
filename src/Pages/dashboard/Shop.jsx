import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Grid3X3,
  List,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/product/productSlice";
import { fetchCategories } from "../../features/category/categorySlice";
import Card from "../../Components/common/Card";
import Loading from "../../Components/common/Loading";

const Shop = () => {
  const dispatch = useDispatch();

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.product);

  const { categories, loading: categoriesLoading } = useSelector(
    (state) => state.category,
  );

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }

    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, products.length, categories.length]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((current) => {
      if (current.includes(categoryId)) {
        return current.filter((id) => id !== categoryId);
      }
      return [...current, categoryId];
    });
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      const searchValue = search.toLowerCase().trim();

      result = result.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchValue) ||
          product.description?.toLowerCase().includes(searchValue) ||
          product.category_name?.toLowerCase().includes(searchValue),
      );
    }

    // Category
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(Number(product.category_id)),
      );
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    if (sortBy === "featured") {
      result.sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
    }

    return result;
  }, [products, search, selectedCategories, sortBy]);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );
  const getCategoryCount = (categoryId) => {
    return products.filter(
      (product) => Number(product.category_id) === Number(categoryId),
    ).length;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategories, sortBy]);
  return (
    <section className="min-h-screen bg-[#FCFBF3]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8">
        <div className="flex items-center gap-3 text-sm mb-5">
          <Link to="/dashboard" className="text-[#aaa39e] hover:text-[#8b3905]">
            Home
          </Link>
          <span className="text-[#c8c0ba]">/</span>
          <span className="text-[#211f1d] font-medium">All Products</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <h1
              className="
              font-serif
              text-4xl
              lg:text-[42px]
              font-bold
              text-[#211f1d]
            "
            >
              All Products
            </h1>

            <p className="mt-2 text-[#9a928c]">
              {filteredProducts.length} products found
            </p>
          </div>

          {/* SORT + VIEW */}
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="
                h-11
                px-4
                bg-white
                borde
                border-[#e5ded8]
                rounded-xl
                text-sm
                text-[#403c39]
                outline-none
                cursor-pointer
              "
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <div
              className="
              flex
              bg-white
              border
              border-[#e5ded8]
              rounded-xl
              overflow-hidden
            "
            >
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`
                  w-11 h-11
                  flex items-center justify-center
                  transition
                  ${
                    viewMode === "grid"
                      ? "bg-[#8b3905] text-white"
                      : "text-[#77716d]"
                  }
                `}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`
                  w-11 h-11
                  flex items-center justify-center
                  transition
                  ${
                    viewMode === "list"
                      ? "bg-[#8b3905] text-white"
                      : "text-[#77716d]"
                  }
                `}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-7 mt-8">
          <aside
            className="
            bg-white
            rounded-[20px]
            border
            border-[#eee8e2]
            p-6
            h-fit
          "
          >
            {/* Filter Header */}
            <div className="flex items-center gap-3 mb-7">
              <SlidersHorizontal size={19} className="text-[#211f1d]" />

              <h2
                className="
                text-lg
                font-bold
                text-[#211f1d]
              "
              >
                Filters
              </h2>
            </div>

            {/* SEARCH */}
            <div>
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="
                  w-full
                  flex
                  items-center
                  justify-between
                  text-sm
                  font-semibold
                  text-[#211f1d]
                "
              >
                Search
                {searchOpen ? (
                  <ChevronUp size={17} />
                ) : (
                  <ChevronDown size={17} />
                )}
              </button>

              {searchOpen && (
                <div className="relative mt-4">
                  <Search
                    size={18}
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-[#aaa39e]
                    "
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="
                      w-full
                      h-11
                      pl-10
                      pr-3
                      rounded-xl
                      border
                      border-[#e5ded8]
                      bg-white
                      text-sm
                      outline-none
                      focus:border-[#8b3905]
                    "
                  />
                </div>
              )}
            </div>

            <div
              className="
              border-t
              border-[#eee8e2]
              my-6
            "
            />

            {/* CATEGORY */}
            <div>
              <button
                type="button"
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="
                  w-full
                  flex
                  items-center
                  justify-between
                  text-sm
                  font-semibold
                  text-[#211f1d]
                "
              >
                Category
                {categoryOpen ? (
                  <ChevronUp size={17} />
                ) : (
                  <ChevronDown size={17} />
                )}
              </button>

              {categoryOpen && (
                <div className="mt-5 space-y-4">
                  {categoriesLoading ? (
                    <p className="text-sm text-[#aaa39e]">
                      Loading categories...
                    </p>
                  ) : (
                    categories.map((category) => (
                      <label
                        key={category.id}
                        className="
                          flex
                          items-center
                          justify-between
                          gap-3
                          cursor-pointer
                          group
                        "
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(
                              Number(category.id),
                            )}
                            onChange={() =>
                              handleCategoryChange(Number(category.id))
                            }
                            className="
                              w-5
                              h-5
                              accent-[#8b3905]
                              cursor-pointer
                            "
                          />

                          <span
                            className="
                            text-sm
                            text-[#55504c]
                            group-hover:text-[#8b3905]
                            transition
                          "
                          >
                            {category.name}
                          </span>
                        </div>

                        <span
                          className="
                          text-xs
                          text-[#aaa39e]
                        "
                        >
                          {getCategoryCount(category.id)}
                        </span>
                      </label>
                    ))
                  )}
                </div>
              )}
            </div>
          </aside>
          <main>
            {productsLoading ? (
              <Loading />
            ) : productsError ? (
              <div
                className="
                bg-white
                rounded-2xl
                p-8
                text-center
                text-red-500
              "
              >
                {productsError}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div
                className="
                bg-white
                rounded-2xl
                border
                border-[#eee8e2]
                p-12
                text-center
              "
              >
                <h3
                  className="
                  text-xl
                  font-semibold
                  text-[#211f1d]
                "
                >
                  No products found
                </h3>

                <p
                  className="
                  mt-2
                  text-sm
                  text-[#aaa39e]
                "
                >
                  Try changing your search or filters.
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                    : "flex flex-col gap-5"
                }
              >
                {paginatedProducts.map((product) => (
                  <Card key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
        {/* Pagination*/}
        {totalPages > 1 && (
          <div className="w-full flex justify-center items-center mt-10">
            <div className="flex items-center gap-2">
              {/* Previous */}
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((prev) => prev - 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="
          px-4
          py-2
          rounded-lg
          border
          border-[#e5ded8]
          bg-white
          text-sm
          text-[#403c39]
          disabled:opacity-40
          disabled:cursor-not-allowed
          hover:border-[#8b3905]
        "
              >
                Previous
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;

                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => {
                      setCurrentPage(pageNumber);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`
              w-10
              h-10
              rounded-lg
              text-sm
              font-medium
              ${
                currentPage === pageNumber
                  ? "bg-[#8b3905] text-white"
                  : "bg-white text-[#403c39] border border-[#e5ded8]"
              }
            `}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {/* Next */}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage((prev) => prev + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="
          px-4
          py-2
          rounded-lg
          border
          border-[#e5ded8]
          bg-white
          text-sm
          text-[#403c39]
          disabled:opacity-40
          disabled:cursor-not-allowed
          hover:border-[#8b3905]
        "
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default Shop;
