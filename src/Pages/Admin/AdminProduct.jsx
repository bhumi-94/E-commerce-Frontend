import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Package,
  CheckCircle,
  XCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchAdminProducts } from "../../features/Admin/adminProductSlice";
import Loading from "../../Components/common/Loading";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    products = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.adminProduct);

  const { categories = [] } = useSelector((state) => state.category || {});

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  // Fetch products
  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const searchText = search.toLowerCase().trim();

      result = result.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchText) ||
          product.category_name?.toLowerCase().includes(searchText),
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter(
        (product) => Number(product.category_id) === Number(categoryFilter),
      );
    }

    if (statusFilter === "active") {
      result = result.filter((product) => Number(product.is_active) === 1);
    }

    if (statusFilter === "disabled") {
      result = result.filter((product) => Number(product.is_active) === 0);
    }

    return result;
  }, [products, search, categoryFilter, statusFilter]);

  // Statistics
  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => Number(product.is_active) === 1,
  ).length;

  const disabledProducts = products.filter(
    (product) => Number(product.is_active) === 0,
  ).length;

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / productsPerPage),
  );

  const startIndex = (currentPage - 1) * productsPerPage;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  // Product image URL
  const getImageUrl = (image) => {
    if (!image) {
      return "/placeholder-product.png";
    }

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }
    if (image.startsWith("/uploads")) {
      return `${import.meta.env.VITE_BACKEND_URL}${image}`;
    }

    return `${import.meta.env.VITE_BACKEND_URL}/uploads/products/${image}`;
    
  };

  // Price format
  const formatPrice = (price) => {
    return `₹${Number(price || 0).toLocaleString("en-IN")}`;
  };

  // Search
  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // Category filter
  const handleCategoryChange = (value) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  // Status filter
  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  // Loading
  if (loading) {
    return (
      <section className="min-h-screen bg-[#FCFBF8]">
        <Loading />
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#FCFBF8] px-4 sm:px-6 lg:px-10 py-8">
      <div className="max-w-[1500px] mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-[#211f1d]">
              Manage Products
            </h1>

            <p className="mt-2 text-sm text-[#8d8782]">
              Manage your Nexora product catalog
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => dispatch(fetchAdminProducts())}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[#e8e0da] bg-white text-[#55504c] hover:bg-[#f8f4f0] transition"
            >
              <RefreshCw size={17} />
              <span>Refresh</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/addproducts")}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#8b3905] text-white font-medium hover:bg-[#742f04] transition"
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* STATISTICS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {/* TOTAL */}
          <div className="bg-white border border-[#eee7e1] rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#918a85]">Total Products</p>

                <h2 className="mt-2 text-2xl font-semibold text-[#211f1d]">
                  {totalProducts}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#f5ebe3] flex items-center justify-center text-[#8b3905]">
                <Package size={21} />
              </div>
            </div>
          </div>

          {/* ACTIVE */}
          <div className="bg-white border border-[#eee7e1] rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#918a85]">Active Products</p>

                <h2 className="mt-2 text-2xl font-semibold text-[#211f1d]">
                  {activeProducts}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                <CheckCircle size={21} />
              </div>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-white border border-[#eee7e1] rounded-2xl p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_220px_180px] gap-3">
            {/* SEARCH */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa39e]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-[#e7dfd8] outline-none text-sm text-[#211f1d] placeholder:text-[#aaa39e] focus:border-[#8b3905]"
              />
            </div>

            {/* CATEGORY */}
            <select
              value={categoryFilter}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="h-12 px-4 rounded-xl border border-[#e7dfd8] bg-white text-sm text-[#55504c] outline-none focus:border-[#8b3905]"
            >
              <option value="all">All Categories</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* STATUS */}
            <select
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="h-12 px-4 rounded-xl border border-[#e7dfd8] bg-white text-sm text-[#55504c] outline-none focus:border-[#8b3905]"
            >
              <option value="all">All Status</option>

              <option value="active">Active</option>
            </select>
          </div>
        </div>

        {/* PRODUCT TABLE */}
        <div className="bg-white border border-[#eee7e1] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-[#faf7f4] border-b border-[#eee7e1]">
                <tr>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-[#77716d] uppercase">
                    Product
                  </th>

                  <th className="text-left px-5 py-4 text-xs font-semibold text-[#77716d] uppercase">
                    Category
                  </th>

                  <th className="text-left px-5 py-4 text-xs font-semibold text-[#77716d] uppercase">
                    Price
                  </th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-[#77716d] uppercase">
                    Total Price
                  </th>

                  <th className="text-left px-5 py-4 text-xs font-semibold text-[#77716d] uppercase">
                    Featured
                  </th>

                  <th className="text-left px-5 py-4 text-xs font-semibold text-[#77716d] uppercase">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-16 text-center">
                      <Package size={42} className="mx-auto text-[#cfc7c0]" />

                      <p className="mt-4 text-lg font-medium text-[#55504c]">
                        No products found
                      </p>

                      <p className="mt-1 text-sm text-[#aaa39e]">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedProducts.map((product) => {
                    const active = Number(product.is_active) === 1;

                    const featured = Number(product.is_featured) === 1;

                    return (
                      <tr
                        key={product.id}
                        className="border-b border-[#f0ebe7] last:border-b-0 hover:bg-[#fdfbf9]"
                      >
                        {/* PRODUCT */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#f5f1ed] shrink-0">
                              <img
                                src={getImageUrl(product.image)}
                                alt={product.name || "Product"}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "/placeholder-product.png";
                                }}
                              />
                            </div>

                            <div className="min-w-0">
                              <p className="font-medium text-[#211f1d] truncate max-w-[300px]">
                                {product.name}
                              </p>

                              <p className="mt-1 text-xs text-[#aaa39e]">
                                Product ID: #{product.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* CATEGORY */}
                        <td className="px-5 py-4">
                          <span className="text-sm text-[#55504c]">
                            {product.category_name || "Uncategorized"}
                          </span>
                        </td>

                        {/* PRICE */}
                        <td className="px-5 py-4">
                          <span className="font-medium text-[#211f1d]">
                            {formatPrice(product.price)}
                          </span>
                        </td>

                        {/* Total Price */}
                        <td className="px-5 py-4">
                          <span className="font-medium text-[#211f1d]">
                            {formatPrice(product.custprice)}
                          </span>
                        </td>

                        {/* FEATURED */}
                        <td className="px-5 py-4">
                          {featured ? (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#fff1e8] text-[#8b3905] text-xs font-medium">
                              Featured
                            </span>
                          ) : (
                            <span className="text-xs text-[#aaa39e]">—</span>
                          )}
                        </td>

                        {/* STATUS */}
                        <td className="px-5 py-4">
                          {active ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-500 text-xs font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                              Disabled
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {filteredProducts.length > 0 && totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 border-t border-[#eee7e1]">
              <p className="text-sm text-[#918a85]">
                Showing{" "}
                <span className="font-medium text-[#55504c]">
                  {startIndex + 1}
                </span>{" "}
                -{" "}
                <span className="font-medium text-[#55504c]">
                  {Math.min(
                    startIndex + productsPerPage,
                    filteredProducts.length,
                  )}
                </span>{" "}
                of{" "}
                <span className="font-medium text-[#55504c]">
                  {filteredProducts.length}
                </span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  className="w-9 h-9 rounded-lg border border-[#e7dfd8] flex items-center justify-center disabled:opacity-40 hover:bg-[#f8f4f0] transition"
                >
                  <ChevronLeft size={17} />
                </button>

                <span className="text-sm text-[#55504c] px-2">
                  {currentPage} / {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  className="w-9 h-9 rounded-lg border border-[#e7dfd8] flex items-center justify-center disabled:opacity-40 hover:bg-[#f8f4f0] transition"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminProducts;
