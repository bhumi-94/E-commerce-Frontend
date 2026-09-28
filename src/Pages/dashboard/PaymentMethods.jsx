import React, { useEffect, useState } from "react";
import {
  CreditCard,
  Smartphone,
  Wallet,
  Plus,
  Edit,
  Trash2,
  Star,
  X,
  CheckCircle,
} from "lucide-react";

import {
  getPaymentMethods,
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  setDefaultPaymentMethod,
} from "../../features/payment/payment.api";

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);

  const [formData, setFormData] = useState({
    method_type: "card",
    provider: "",
    display_name: "",
    upi_id: "",
    last_four: "",
    is_default: false,
  });

  const loadPaymentMethods = async () => {
    try {
      setLoading(true);

      const response = await getPaymentMethods();

      setPaymentMethods(response.paymentMethods || []);
    } catch (error) {
      console.error("Failed to fetch payment methods:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  const handleAdd = () => {
    setEditingMethod(null);

    setFormData({
      method_type: "card",
      provider: "",
      display_name: "",
      upi_id: "",
      last_four: "",
      is_default: false,
    });

    setShowModal(true);
  };

  const handleEdit = (method) => {
    setEditingMethod(method);

    setFormData({
      method_type: method.method_type || "card",
      provider: method.provider || "",
      display_name: method.display_name || "",
      upi_id: method.upi_id || "",
      last_four: method.last_four || "",
      is_default: Boolean(method.is_default),
    });

    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      if (editingMethod) {
        await updatePaymentMethod(editingMethod.id, formData);
      } else {
        await addPaymentMethod(formData);
      }

      setShowModal(false);
      await loadPaymentMethods();
    } catch (error) {
      console.error("Payment method save error:", error);

      alert(error?.response?.data?.message || "Failed to save payment method.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this payment method?",
    );

    if (!confirmed) return;

    try {
      await deletePaymentMethod(id);

      await loadPaymentMethods();
    } catch (error) {
      console.error("Delete payment method error:", error);

      alert(
        error?.response?.data?.message || "Failed to delete payment method.",
      );
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await setDefaultPaymentMethod(id);

      await loadPaymentMethods();
    } catch (error) {
      console.error("Set default payment method error:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to set default payment method.",
      );
    }
  };

  const getPaymentIcon = (type) => {
    if (type === "upi") {
      return <Smartphone size={25} />;
    }

    if (type === "cod") {
      return <Wallet size={25} />;
    }

    return <CreditCard size={25} />;
  };

  const getPaymentTitle = (method) => {
    if (method.method_type === "upi") {
      return method.upi_id || "UPI Payment";
    }

    if (method.method_type === "cod") {
      return "Cash on Delivery";
    }

    if (method.last_four) {
      return `${method.provider || "Card"} •••• ${method.last_four}`;
    }

    return method.display_name || "Card";
  };

  return (
    <div className="min-h-screen bg-[#FCFBF3] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* ================= HEADER ================= */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#292524] sm:text-3xl">
              Payment Methods
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your saved payment methods
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#8b3905] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#742f04] sm:w-auto"
          >
            <Plus size={18} />
            Add Method
          </button>
        </div>

        {/* ================= LOADING ================= */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#e8d5c8] border-t-[#8b3905]" />
          </div>
        ) : paymentMethods.length === 0 ? (
          /* ================= EMPTY STATE ================= */
          <div className="rounded-[22px] border border-[#eee8e3] bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f8eee8] text-[#8b3905]">
              <CreditCard size={30} strokeWidth={1.7} />
            </div>

            <h2 className="text-lg font-semibold text-[#292524]">
              No payment methods saved
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              Add a payment method to make checkout faster and easier.
            </p>

            <button
              onClick={handleAdd}
              className="mt-6 inline-flex items-center gap-2 rounded-[14px] bg-[#8b3905] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#742f04]"
            >
              <Plus size={18} />
              Add Payment Method
            </button>
          </div>
        ) : (
          /* ================= PAYMENT CARDS ================= */
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="relative rounded-[22px] border border-[#eee8e3] bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
              >
                {/* DEFAULT BADGE */}
                {Boolean(method.is_default) && (
                  <div className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-[#f5e9e1] px-3 py-1 text-xs font-medium text-[#8b3905]">
                    <Star size={13} fill="currentColor" />
                    Default
                  </div>
                )}

                {/* ICON + TYPE */}
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] bg-[#f8eee8] text-[#8b3905]">
                    {getPaymentIcon(method.method_type)}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">
                      {method.method_type === "upi"
                        ? "UPI"
                        : method.method_type === "cod"
                          ? "Cash on Delivery"
                          : "Credit / Debit Card"}
                    </p>

                    <h3 className="mt-1 truncate pr-20 text-base font-semibold text-[#292524]">
                      {getPaymentTitle(method)}
                    </h3>
                  </div>
                </div>

                {/* PAYMENT DETAILS */}
                <div className="mt-6 space-y-2">
                  {method.display_name && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Name</span>

                      <span className="font-medium text-gray-700">
                        {method.display_name}
                      </span>
                    </div>
                  )}

                  {method.provider && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Provider</span>

                      <span className="font-medium text-gray-700">
                        {method.provider}
                      </span>
                    </div>
                  )}

                  {method.method_type === "upi" && method.upi_id && (
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-gray-500">UPI ID</span>

                      <span className="max-w-[60%] truncate font-medium text-gray-700">
                        {method.upi_id}
                      </span>
                    </div>
                  )}

                  {method.method_type === "cod" && (
                    <div className="flex items-center gap-2 rounded-[12px] bg-[#faf7f4] px-3 py-2 text-sm text-gray-600">
                      <CheckCircle size={16} className="text-[#8b3905]" />
                      Available for eligible orders
                    </div>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-[#eee8e3] pt-4">
                  <button
                    onClick={() => handleEdit(method)}
                    className="flex items-center gap-2 rounded-[11px] px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-[#faf7f4] hover:text-[#8b3905]"
                  >
                    <Edit size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(method.id)}
                    className="flex items-center gap-2 rounded-[11px] px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                  {!Boolean(method.is_default) && (
                    <button
                      onClick={() => handleSetDefault(method.id)}
                      className="ml-auto rounded-[11px] px-3 py-2 text-sm font-medium text-[#8b3905] transition hover:bg-[#f8eee8]"
                    >
                      Set as Default
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[24px] bg-white shadow-2xl">
            {/* MODAL HEADER */}
            <div className="sticky top-0 flex items-center justify-between border-b border-[#eee8e3] bg-white px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-semibold text-[#292524]">
                  {editingMethod ? "Edit Payment Method" : "Add Payment Method"}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Save your preferred payment method
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-full p-2 text-gray-500 transition hover:bg-[#faf7f4] hover:text-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL FORM */}
            <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
              {/* PAYMENT TYPE */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Payment Type
                </label>

                <select
                  name="method_type"
                  value={formData.method_type}
                  onChange={handleChange}
                  className="w-full rounded-[13px] border border-[#ddd5cf] bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#8b3905] focus:ring-2 focus:ring-[#8b3905]/10"
                >
                  <option value="card">Credit / Debit Card</option>

                  <option value="upi">UPI</option>

                  <option value="cod">Cash on Delivery</option>
                </select>
              </div>

              {/* CARD FIELDS */}
              {formData.method_type === "card" && (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Card Provider
                    </label>

                    <input
                      type="text"
                      name="provider"
                      value={formData.provider}
                      onChange={handleChange}
                      placeholder="e.g. Visa, Mastercard, RuPay"
                      className="w-full rounded-[13px] border border-[#ddd5cf] px-4 py-3 text-sm outline-none transition focus:border-[#8b3905] focus:ring-2 focus:ring-[#8b3905]/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Card Name
                    </label>

                    <input
                      type="text"
                      name="display_name"
                      value={formData.display_name}
                      onChange={handleChange}
                      placeholder="e.g. My Personal Card"
                      className="w-full rounded-[13px] border border-[#ddd5cf] px-4 py-3 text-sm outline-none transition focus:border-[#8b3905] focus:ring-2 focus:ring-[#8b3905]/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Last 4 Digits
                    </label>

                    <input
                      type="text"
                      name="last_four"
                      value={formData.last_four}
                      onChange={handleChange}
                      maxLength={4}
                      inputMode="numeric"
                      placeholder="1234"
                      className="w-full rounded-[13px] border border-[#ddd5cf] px-4 py-3 text-sm outline-none transition focus:border-[#8b3905] focus:ring-2 focus:ring-[#8b3905]/10"
                    />
                  </div>
                </>
              )}

              {/* UPI FIELDS */}
              {formData.method_type === "upi" && (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      UPI Provider
                    </label>

                    <input
                      type="text"
                      name="provider"
                      value={formData.provider}
                      onChange={handleChange}
                      placeholder="e.g. Google Pay, PhonePe"
                      className="w-full rounded-[13px] border border-[#ddd5cf] px-4 py-3 text-sm outline-none transition focus:border-[#8b3905] focus:ring-2 focus:ring-[#8b3905]/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      UPI ID
                    </label>

                    <input
                      type="text"
                      name="upi_id"
                      value={formData.upi_id}
                      onChange={handleChange}
                      placeholder="example@upi"
                      className="w-full rounded-[13px] border border-[#ddd5cf] px-4 py-3 text-sm outline-none transition focus:border-[#8b3905] focus:ring-2 focus:ring-[#8b3905]/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Display Name
                    </label>

                    <input
                      type="text"
                      name="display_name"
                      value={formData.display_name}
                      onChange={handleChange}
                      placeholder="e.g. My UPI"
                      className="w-full rounded-[13px] border border-[#ddd5cf] px-4 py-3 text-sm outline-none transition focus:border-[#8b3905] focus:ring-2 focus:ring-[#8b3905]/10"
                    />
                  </div>
                </>
              )}

              {/* COD */}
              {formData.method_type === "cod" && (
                <div className="rounded-[14px] bg-[#faf7f4] p-4">
                  <div className="flex gap-3">
                    <Wallet
                      size={22}
                      className="mt-0.5 shrink-0 text-[#8b3905]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Cash on Delivery
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Cash on Delivery will be available during checkout for
                        eligible orders.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* DEFAULT CHECKBOX */}
              <label className="flex cursor-pointer items-center gap-3 rounded-[13px] bg-[#faf7f4] p-4">
                <input
                  type="checkbox"
                  name="is_default"
                  checked={formData.is_default}
                  onChange={handleChange}
                  className="h-4 w-4 accent-[#8b3905]"
                />

                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Set as default
                  </p>

                  <p className="text-xs text-gray-500">
                    Use this method automatically during checkout.
                  </p>
                </div>
              </label>

              {/* SECURITY NOTE */}
              <div className="rounded-[13px] border border-[#eee8e3] bg-white p-3 text-xs leading-5 text-gray-500">
                For security, Nexora does not store your full card number, CVV,
                PIN, or UPI password.
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-[13px] border border-[#ddd5cf] px-5 py-3 text-sm font-medium text-gray-600 transition hover:bg-[#faf7f4]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-[13px] bg-[#8b3905] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#742f04] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingMethod
                      ? "Update Method"
                      : "Save Method"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
