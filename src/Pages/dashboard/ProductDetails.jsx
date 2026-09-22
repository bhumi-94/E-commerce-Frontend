import React, { useEffect, useState } from "react";
import { Heart, Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loading from "../../Components/common/Loading";
import Card from "../../Components/common/Card";
import {
  fetchProducts,
  fetchProductById,
  clearSelectedProduct,
} from "../../features/product/productSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../features/wishlist/wishlistSlice";
import { addProductToCart } from "../../features/cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedProduct, products, productLoading, productError } =
    useSelector((state) => state.product);

  const wishlistItems = useSelector((state) => state.wishlist?.items || [])

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [products.length, dispatch]);
  useEffect(() => {
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch]);

  
  if (productLoading) {
    return (
      <div className="min-h-screen bg-[#FCFBF3] flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  if (productError) {
    return (
      <div className="min-h-screen bg-[#FCFBF3] flex flex-col items-center justify-center px-6">
        <p className="text-red-500 text-lg font-medium">{productError}</p>

        <Link
          to="/shop"
          className="mt-5 bg-[#8b3905] text-white px-6 py-3 rounded-lg"
        >
          Back to Shop
        </Link>
      </div>
    );
  }
  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-[#FCFBF3] flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  const product = selectedProduct;
  const relatedProducts = products.filter(
    (item) =>
      Number(item.category_id) === Number(product.category_id) &&
      Number(item.id) !== Number(product.id),
  );
  const imageUrl = product.image
    ? `http://localhost:3000${product.image}`
    : null;
  const increaseQuantity = () => {
    if (quantity < Number(product.stock_quantity || 1)) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const handleAddToCart = () => {
    dispatch(
      addProductToCart({
        product,
        quantity,
      }),
    );
  };
  const handleBuyNow = () => {
    dispatch(
      addProductToCart({
        product,
        quantity,
      }),
    );

    if (!isWishlisted) {
      dispatch(addToWishlist(product));
    }

    navigate("/cart");
  };
  const handleWishlist = async () => {
    if (!product?.id) return;

    try {
      if (isWishlisted) {
        await dispatch(removeFromWishlist(product.id)).unwrap();
      } else {
        await dispatch(addToWishlist(product)).unwrap();
      }
    } catch (error) {
      console.error("WISHLIST ERROR:", error);
    }
  };
  const isWishlisted = wishlistItems.some(
    (item) => Number(item.product_id) === Number(product?.id),
  );
  return (
    <section className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8">
        {/* ================= BREADCRUMB ================= */}

        <div className="flex items-center gap-2 text-sm mb-8">
          <Link to="/dashboard" className="text-[#99918b] hover:text-[#8b3905]">
            Home
          </Link>

          <span className="text-[#bbb4ae]">/</span>

          <Link to="/shop" className="text-[#99918b] hover:text-[#8b3905]">
            Shop
          </Link>

          <span className="text-[#bbb4ae]">/</span>

          <span className="text-[#211f1d] font-medium line-clamp-1">
            {product.name}
          </span>
        </div>

        {/* ================= MAIN PRODUCT ================= */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ================= IMAGE ================= */}

          <div>
            <div className="relative w-full h-[450px] lg:h-[700px] bg-[#f7f5f2] rounded-[28px] overflow-hidden">
              {product.is_featured && (
                <div className="absolute top-5 left-5 z-10 bg-green-600 text-white px-4 py-2 rounded-full font-bold text-sm">
                  Featured
                </div>
              )}

              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#aaa39e]">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* ================= DETAILS ================= */}

          <div className="py-2 lg:py-4">
            {/* CATEGORY */}

            <p className="text-[#a14b0b] uppercase tracking-wide font-semibold text-sm">
              {product.category_name}
            </p>

            {/* NAME */}

            <h1 className="text-3xl lg:text-4xl font-bold text-[#211f1d] mt-4 leading-tight">
              {product.name}
            </h1>

            {/* PRICE */}

            <div className="bg-gradient-to-r from-[#FCFBF3] to-[#FDFEFF] rounded-2xl p-5 mt-4 border border-[#f0ebe5]">
              <span className="text-3xl lg:text-4xl font-bold text-[#211f1d]">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </span>

              <p className="text-sm text-[#99918b] mt-2">
                Inclusive of all taxes.
              </p>
            </div>

            {/* DESCRIPTION */}

            <div className="mt-5">
              <h2 className="text-lg font-semibold text-[#211f1d] mb-2">
                Description
              </h2>

              <p className="text-[#77716d] leading-6 text-sm">
                {product.description || "Premium quality product."}
              </p>
            </div>

            {/* STOCK */}

            <div className="mt-5">
              {Number(product.stock_quantity) > 0 ? (
                <p className="text-green-600 font-medium">In Stock</p>
              ) : (
                <p className="text-red-500 font-medium">Out of Stock</p>
              )}
            </div>

            {/* QUANTITY */}

            {Number(product.stock_quantity) > 0 && (
              <div className="flex items-center gap-5 mt-7">
                <span className="font-semibold text-[#211f1d]">Quantity</span>

                <div className="flex items-center border border-[#ded8d2] bg-white rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="w-12 h-12 flex items-center justify-center hover:bg-[#f5f1ed] disabled:opacity-40"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="w-12 text-center font-semibold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= Number(product.stock_quantity)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-[#f5f1ed] disabled:opacity-40"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* ================= BUTTONS ================= */}

            <div className="grid grid-cols-[1fr_1fr_auto] gap-3 mt-8">
              {/* ADD TO CART */}

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={Number(product.stock_quantity) <= 0}
                className="bg-[#f5eee7] text-[#8b3905] py-3 rounded-xl font-semibold hover:bg-[#eadbcd] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>

              {/* BUY NOW */}

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={Number(product.stock_quantity) <= 0}
                className="bg-[#8b3905] text-white py-3 rounded-xl font-semibold hover:bg-[#722e04] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>

              {/* WISHLIST */}
              <button
                type="button"
                onClick={handleWishlist}
                className="w-12 h-12 rounded-full border border-[#e5ddd5] flex items-center justify-center hover:bg-[#f8f1eb] transition"
              >
                <Heart
                  size={22}
                  className={
                    isWishlisted
                      ? "fill-[#8b3905] text-[#8b3905]"
                      : "text-[#555]"
                  }
                />
              </button>
            </div>

            {/* ================= FEATURES ================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-white rounded-2xl p-4 border border-[#f0ebe5]">
                <p className="font-semibold text-[#211f1d]">🚚 Free Delivery</p>

                <p className="text-sm text-[#99918b] mt-1">
                  On orders above ₹999
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#f0ebe5]">
                <p className="font-semibold text-[#211f1d]">🔃 Easy Returns</p>

                <p className="text-sm text-[#99918b] mt-1">
                  Easy return policy
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#f0ebe5]">
                <p className="font-semibold text-[#211f1d]">
                  🔐 Secure Payment
                </p>

                <p className="text-sm text-[#99918b] mt-1">100% Protected</p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#f0ebe5]">
                <p className="font-semibold text-[#211f1d]">
                  ✨ Genuine Product
                </p>

                <p className="text-sm text-[#99918b] mt-1">Verified Quality</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PRODUCT DESCRIPTION ================= */}

        <div className="mt-14 bg-gradient-to-r from-[#FCFBF3] to-[#FDFEFF] rounded-2xl p-6 lg:p-8 border border-[#f0ebe5]">
          <h2 className="text-2xl font-bold text-[#211f1d]">
            Product Description
          </h2>

          <p className="mt-4 text-[#77716d] leading-8">
            {product.description || "Premium quality product."}
          </p>
        </div>

        {/* ================= RELATED PRODUCTS ================= */}

        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[#a14b0b] text-sm uppercase tracking-wide font-semibold">
                  You may also like
                </p>

                <h2 className="text-2xl lg:text-3xl font-bold text-[#211f1d] mt-1">
                  Related Products
                </h2>
              </div>

              <Link
                to="/shop"
                className="text-sm font-semibold text-[#8b3905] hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <Card key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
