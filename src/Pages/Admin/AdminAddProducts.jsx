import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ImagePlus,
  X,
  PackagePlus,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../features/category/categorySlice";
import { addAdminProduct } from "../../features/Admin/adminProductSlice";

const AdminAddProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories = [] } = useSelector((state) => state.category);
  const { actionLoading = false, error: productError = null } = useSelector(
    (state) => state.adminProduct,
  );
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    description: "",
    price: "",
    is_featured: false,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        image: "Please select a valid image.",
      }));

      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "Image size must be less than 5 MB.",
      }));
      return;
    }
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
    setErrors((prev) => ({
      ...prev,
      image: "",
    }));
  };
  const removeImage = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    setSelectedImage(null);
    setPreviewImage("");
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Product name is required.";
    }
    if (!formData.category_id) {
      newErrors.category_id = "Please select a category.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Product description is required.";
    }
    if (formData.price === "" || Number(formData.price) <= 0) {
      newErrors.price = "Enter a valid price.";
    }
    if (!selectedImage) {
      newErrors.image = "Product image is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    if (!validateForm()) {
      return;
    }
    const data = new FormData();
    data.append("name", formData.name.trim());
    data.append("category_id", formData.category_id);
    data.append("description", formData.description.trim());
    data.append("price", formData.price);
    data.append("is_featured", formData.is_featured ? "1" : "0");
    data.append("image", selectedImage);
    try {
      const result = await dispatch(addAdminProduct(data)).unwrap();
      setSuccessMessage(result?.message || "Product added successfully.");
      setFormData({
        name: "",
        category_id: "",
        description: "",
        price: "",
        is_featured: false,
      });

      removeImage();

      setTimeout(() => {
        navigate("/admin/products");
      }, 1200);
    } catch (error) {
      console.error("ADD PRODUCT ERROR:", error);
    }
  };

  return (
    <section
      className="
      min-h-screen
      bg-[#FCFBF8]
      px-4
      sm:px-6
      lg:px-10
      py-8
    "
    >
      <div
        className="
        max-w-[1100px]
        mx-auto
      "
      >
        {/* ================= HEADER ================= */}

        <div
          className="
          flex
          items-center
          gap-4
          mb-8
        "
        >
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="
              w-10
              h-10
              rounded-xl
              border
              border-[#e7dfd8]
              bg-white
              flex
              items-center
              justify-center
              text-[#55504c]
              hover:text-[#8b3905]
              hover:border-[#8b3905]
            "
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1
              className="
              text-3xl
              font-semibold
              text-[#211f1d]
            "
            >
              Add Product
            </h1>

            <p
              className="
              mt-1
              text-sm
              text-[#918a85]
            "
            >
              Add a new product to your Nexora catalog
            </p>
          </div>
        </div>

        {/* ================= SUCCESS ================= */}

        {successMessage && (
          <div
            className="
            mb-6
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-green-200
            bg-green-50
            px-5
            py-4
            text-sm
            text-green-700
          "
          >
            <CheckCircle size={19} />

            {successMessage}
          </div>
        )}

        {/* ================= ERROR ================= */}

        {productError && (
          <div
            className="
            mb-6
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-5
            py-4
            text-sm
            text-red-600
          "
          >
            {productError}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className="
            bg-white
            border
            border-[#eee7e1]
            rounded-2xl
            p-6
          "
          >
            <div
              className="
              flex
              items-center
              gap-3
              mb-6
            "
            >
              <div
                className="
                w-10
                h-10
                rounded-xl
                bg-[#f7eee8]
                flex
                items-center
                justify-center
                text-[#8b3905]
              "
              >
                <ImagePlus size={19} />
              </div>

              <div>
                <h2
                  className="
                  font-semibold
                  text-[#211f1d]
                "
                >
                  Product Image
                </h2>

                <p
                  className="
                  text-xs
                  text-[#aaa39e]
                  mt-1
                "
                >
                  JPG, PNG or WEBP • Maximum 5 MB
                </p>
              </div>
            </div>

            <div
              className="
              flex
              flex-col
              sm:flex-row
              gap-6
            "
            >
              {/* IMAGE PREVIEW */}

              <div
                className="
                w-full
                sm:w-48
                h-48
                rounded-2xl
                border
                border-dashed
                border-[#dcd3cc]
                bg-[#faf8f5]
                overflow-hidden
                flex
                items-center
                justify-center
              "
              >
                {previewImage ? (
                  <div
                    className="
                    relative
                    w-full
                    h-full
                  "
                  >
                    <img
                      src={previewImage}
                      alt="Product preview"
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />

                    <button
                      type="button"
                      onClick={removeImage}
                      className="
                        absolute
                        top-2
                        right-2
                        w-8
                        h-8
                        rounded-full
                        bg-white
                        shadow
                        flex
                        items-center
                        justify-center
                        text-red-500
                        hover:bg-red-50
                      "
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div
                    className="
                    text-center
                    px-4
                  "
                  >
                    <ImagePlus
                      size={30}
                      className="
                        mx-auto
                        text-[#c4bbb4]
                      "
                    />

                    <p
                      className="
                      mt-3
                      text-xs
                      text-[#aaa39e]
                    "
                    >
                      No image selected
                    </p>
                  </div>
                )}
              </div>

              {/* IMAGE INPUT */}

              <div
                className="
                flex
                flex-col
                justify-center
              "
              >
                <label
                  htmlFor="product-image"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-5
                    py-3
                    rounded-xl
                    bg-[#8b3905]
                    text-white
                    text-sm
                    font-medium
                    cursor-pointer
                    hover:bg-[#742f04]
                  "
                >
                  <ImagePlus size={17} />
                  Choose Image
                </label>

                <input
                  id="product-image"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <p
                  className="
                  mt-3
                  text-xs
                  text-[#aaa39e]
                "
                >
                  Select one product image.
                </p>

                {errors.image && (
                  <p
                    className="
                    mt-2
                    text-xs
                    text-red-500
                  "
                  >
                    {errors.image}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div
            className="
            bg-white
            border
            border-[#eee7e1]
            rounded-2xl
            p-6
          "
          >
            <div
              className="
              flex
              items-center
              gap-3
              mb-6
            "
            >
              <div
                className="
                w-10
                h-10
                rounded-xl
                bg-[#f7eee8]
                flex
                items-center
                justify-center
                text-[#8b3905]
              "
              >
                <PackagePlus size={19} />
              </div>

              <div>
                <h2
                  className="
                  font-semibold
                  text-[#211f1d]
                "
                >
                  Product Information
                </h2>

                <p
                  className="
                  text-xs
                  text-[#aaa39e]
                  mt-1
                "
                >
                  Enter the details of your product
                </p>
              </div>
            </div>

            {/* PRODUCT NAME */}

            <div className="mb-5">
              <label
                className="
                block
                text-sm
                font-medium
                text-[#55504c]
                mb-2
              "
              >
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className={`
                  w-full
                  h-12
                  px-4
                  rounded-xl
                  border
                  ${errors.name ? "border-red-400" : "border-[#e7dfd8]"}
                  outline-none
                  text-sm
                  text-[#211f1d]
                  placeholder:text-[#aaa39e]
                  focus:border-[#8b3905]
                `}
              />

              {errors.name && (
                <p
                  className="
                  mt-1.5
                  text-xs
                  text-red-500
                "
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* CATEGORY */}

            <div className="mb-5">
              <label
                className="
                block
                text-sm
                font-medium
                text-[#55504c]
                mb-2
              "
              >
                Category
              </label>

              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className={`
                  w-full
                  h-12
                  px-4
                  rounded-xl
                  border
                  ${errors.category_id ? "border-red-400" : "border-[#e7dfd8]"}
                  bg-white
                  outline-none
                  text-sm
                  text-[#55504c]
                  focus:border-[#8b3905]
                `}
              >
                <option value="">Select category</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {errors.category_id && (
                <p
                  className="
                  mt-1.5
                  text-xs
                  text-red-500
                "
                >
                  {errors.category_id}
                </p>
              )}
            </div>

            {/* DESCRIPTION */}

            <div className="mb-5">
              <label
                className="
                block
                text-sm
                font-medium
                text-[#55504c]
                mb-2
              "
              >
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Enter a detailed product description"
                className={`
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  ${errors.description ? "border-red-400" : "border-[#e7dfd8]"}
                  outline-none
                  resize-none
                  text-sm
                  text-[#211f1d]
                  placeholder:text-[#aaa39e]
                  focus:border-[#8b3905]
                `}
              />

              {errors.description && (
                <p
                  className="
                  mt-1.5
                  text-xs
                  text-red-500
                "
                >
                  {errors.description}
                </p>
              )}
            </div>

            {/* PRICE*/}

            <div
              className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-5
            "
            >
              {/* PRICE */}

              <div>
                <label
                  className="
                  block
                  text-sm
                  font-medium
                  text-[#55504c]
                  mb-2
                "
                >
                  Price
                </label>

                <div className="relative">
                  <span
                    className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-sm
                    text-[#77716d]
                  "
                  >
                    ₹
                  </span>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className={`
                      w-full
                      h-12
                      pl-9
                      pr-4
                      rounded-xl
                      border
                      ${errors.price ? "border-red-400" : "border-[#e7dfd8]"}
                      outline-none
                      text-sm
                      focus:border-[#8b3905]
                    `}
                  />
                </div>

                {errors.price && (
                  <p
                    className="
                    mt-1.5
                    text-xs
                    text-red-500
                  "
                  >
                    {errors.price}
                  </p>
                )}
              </div>
            </div>

            {/* FEATURED */}

            <div
              className="
              mt-6
              p-4
              rounded-xl
              bg-[#faf7f4]
              border
              border-[#eee7e1]
            "
            >
              <label
                className="
                flex
                items-start
                gap-3
                cursor-pointer
              "
              >
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleChange}
                  className="
                    mt-0.5
                    w-4
                    h-4
                    accent-[#8b3905]
                    cursor-pointer
                  "
                />

                <div>
                  <p
                    className="
                    text-sm
                    font-medium
                    text-[#55504c]
                  "
                  >
                    Featured Product
                  </p>

                  <p
                    className="
                    mt-1
                    text-xs
                    text-[#aaa39e]
                  "
                  >
                    Show this product as a featured item on Nexora.
                  </p>
                </div>
              </label>
            </div>
          </div>
          <div
            className="
            flex
            flex-col-reverse
            sm:flex-row
            sm:justify-end
            gap-3
            pb-8
          "
          >
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              disabled={actionLoading}
              className="
                px-6
                py-3
                rounded-xl
                border
                border-[#e0d7d0]
                bg-white
                text-[#55504c]
                font-medium
                hover:bg-[#f8f4f0]
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={actionLoading}
              className="
                px-7
                py-3
                rounded-xl
                bg-[#8b3905]
                text-white
                font-medium
                hover:bg-[#742f04]
                disabled:opacity-60
                flex
                items-center
                justify-center
                gap-2
              "
            >
              {actionLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <PackagePlus size={18} />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AdminAddProducts;
