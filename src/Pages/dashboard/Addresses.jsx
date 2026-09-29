import React, { useEffect, useState } from "react";
import {
  MapPin,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  X,
  Phone,
  Home,
  Briefcase,
} from "lucide-react";

import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../../features/addresses/address.api";
import Loading from "../../Components/common/Loading";

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    address_type: "Home",
    is_default: false,
  });

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAddresses();

      if (response.success) {
        setAddresses(response.addresses || []);
      }
    } catch (error) {
      console.error("LOAD ADDRESSES ERROR:", error);

      setError(error.response?.data?.message || "Failed to load addresses.");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddNew = () => {
    setEditingAddress(null);

    setFormData({
      first_name: "",
      last_name: "",
      phone: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
      address_type: "Home",
      is_default: addresses.length === 0,
    });

    setError("");
    setShowForm(true);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);

    setFormData({
      first_name: address.first_name || "",
      last_name: address.last_name || "",
      phone: address.phone || "",
      address_line1: address.address_line1 || "",
      address_line2: address.address_line2 || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
      country: address.country || "India",
      address_type: address.address_type || "Home",
      is_default: Boolean(address.is_default),
    });

    setError("");
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      let response;

      if (editingAddress) {
        response = await updateAddress(editingAddress.id, formData);
      } else {
        response = await addAddress(formData);
      }

      if (response.success) {
        await loadAddresses();

        setShowForm(false);
        setEditingAddress(null);
      }
    } catch (error) {
      console.error("SAVE ADDRESS ERROR:", error);

      setError(error.response?.data?.message || "Failed to save address.");
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?",
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteAddress(id);

      if (response.success) {
        setAddresses((prev) => prev.filter((address) => address.id !== id));
      }
    } catch (error) {
      console.error("DELETE ADDRESS ERROR:", error);

      setError(error.response?.data?.message || "Failed to delete address.");
    }
  };

  const handleSetDefault = async (id) => {
    try {
      const response = await setDefaultAddress(id);

      if (response.success) {
        await loadAddresses();
      }
    } catch (error) {
      console.error("SET DEFAULT ADDRESS ERROR:", error);

      setError(
        error.response?.data?.message || "Failed to set default address.",
      );
    }
  };

  const handleCloseForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingAddress(null);
    setError("");
  };

  const getAddressIcon = (type) => {
    if (type === "Work") {
      return <Briefcase size={18} />;
    }

    return <Home size={18} />;
  };

  return (
    <div className="min-h-screen bg-[#FCFBF3] px-4 sm:px-6 lg:px-10 py-6 rounded-3xl">
      <div className="max-w-[1200px] mx-auto">
        {/* HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#1f1d1b]">
              My Addresses
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage your saved delivery addresses
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddNew}
            className="
              flex
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
              hover:bg-[#742f04]
              transition
              cursor-pointer
              shadow-sm
            "
          >
            <Plus size={18} />
            Add New Address
          </button>
        </div>

        {/* ERROR */}

        {error && !showForm && (
          <div className="mb-5 rounded-xl bg-red-50 border border-red-100 text-red-600 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* LOADING */}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            {/* <div className="text-[#8b3905] font-medium">
              Loading addresses...
            </div> */}
            <Loading />
          </div>
        ) : addresses.length === 0 ? (
          <div className="bg-white border border-[#eee8e3] rounded-[22px] shadow-sm py-16 px-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#f5e9e1] flex items-center justify-center text-[#8b3905] mb-5">
              <MapPin size={28} />
            </div>

            <h2 className="text-lg font-semibold text-[#252321]">
              No addresses saved
            </h2>

            <p className="text-sm text-gray-500 mt-2 mb-6">
              Add your first delivery address to make checkout faster.
            </p>

            <button
              type="button"
              onClick={handleAddNew}
              className="
                inline-flex
                items-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-[#8b3905]
                text-white
                text-sm
                font-medium
                hover:bg-[#742f04]
                transition
                cursor-pointer
              "
            >
              <Plus size={18} />
              Add Address
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="
                  bg-white
                  rounded-[22px]
                  border
                  border-[#eee8e3]
                  shadow-sm
                  p-6
                  relative
                  transition
                  hover:shadow-md
                "
              >
                {/* TOP */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f5e9e1] text-[#8b3905] flex items-center justify-center">
                      {getAddressIcon(address.address_type)}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#252321]">
                          {address.address_type}
                        </h3>

                        {Boolean(address.is_default) && (
                          <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-[#f5e9e1] text-[#8b3905]">
                            Default
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-gray-400 mt-0.5">
                        Delivery Address
                      </p>
                    </div>
                  </div>
                </div>

                {/* ADDRESS CONTENT */}
                <div className="mt-5">
                  <h4 className="font-semibold text-[#252321]">
                    {address.first_name} {address.last_name}
                  </h4>

                  <div className="flex items-start gap-2 mt-2 text-sm text-gray-600">
                    <MapPin
                      size={16}
                      className="mt-0.5 shrink-0 text-gray-400"
                    />

                    <p className="leading-6">
                      {address.address_line1}
                      {address.address_line2 && (
                        <>
                          <br />
                          {address.address_line2}
                        </>
                      )}
                      <br />
                      {address.city}, {address.state} - {address.pincode}
                      <br />
                      {address.country}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                    <Phone size={15} className="text-gray-400" />

                    <span>{address.phone}</span>
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="border-t border-[#eee8e3] my-5" />

                {/* ACTIONS */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(address)}
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-sm
                        font-medium
                        text-gray-600
                        hover:text-[#8b3905]
                        transition
                        cursor-pointer
                      "
                    >
                      <Edit size={16} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(address.id)}
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-sm
                        font-medium
                        text-gray-600
                        hover:text-red-600
                        transition
                        cursor-pointer
                      "
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>

                  {!Boolean(address.is_default) && (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(address.id)}
                      className="
                        text-sm
                        font-medium
                        text-[#8b3905]
                        hover:underline
                        cursor-pointer
                      "
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

      {showForm && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/40
            flex
            items-center
            justify-center
            p-4
          "
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseForm();
            }
          }}
        >
          <div
            className="
              w-full
              max-w-[650px]
              max-h-[90vh]
              overflow-y-auto
              bg-white
              rounded-[24px]
              shadow-2xl
              p-6
              sm:p-8
            "
          >
            {/* MODAL HEADER */}

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-[#252321]">
                  {editingAddress ? "Edit Address" : "Add New Address"}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Enter your delivery address details
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseForm}
                className="
                  w-9
                  h-9
                  rounded-full
                  bg-gray-100
                  flex
                  items-center
                  justify-center
                  text-gray-500
                  hover:bg-gray-200
                  transition
                  cursor-pointer
                "
              >
                <X size={18} />
              </button>
            </div>

            {/* MODAL ERROR */}

            {error && (
              <div className="mb-5 rounded-xl bg-red-50 border border-red-100 text-red-600 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {/* FORM */}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NAME */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>

                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    placeholder="First name"
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-[#e7dfd8]
                      outline-none
                      text-sm
                      focus:border-[#8b3905]
                      focus:ring-2
                      focus:ring-[#8b3905]/10
                    "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>

                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Last name"
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-[#e7dfd8]
                      outline-none
                      text-sm
                      focus:border-[#8b3905]
                      focus:ring-2
                      focus:ring-[#8b3905]/10
                    "
                  />
                </div>
              </div>

              {/* PHONE */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter phone number"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-[#e7dfd8]
                    outline-none
                    text-sm
                    focus:border-[#8b3905]
                    focus:ring-2
                    focus:ring-[#8b3905]/10
                  "
                />
              </div>

              {/* ADDRESS */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Line 1 *
                </label>

                <input
                  type="text"
                  name="address_line1"
                  value={formData.address_line1}
                  onChange={handleChange}
                  required
                  placeholder="House no., street, area"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-[#e7dfd8]
                    outline-none
                    text-sm
                    focus:border-[#8b3905]
                    focus:ring-2
                    focus:ring-[#8b3905]/10
                  "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Line 2
                </label>

                <input
                  type="text"
                  name="address_line2"
                  value={formData.address_line2}
                  onChange={handleChange}
                  placeholder="Apartment, landmark, etc."
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-[#e7dfd8]
                    outline-none
                    text-sm
                    focus:border-[#8b3905]
                    focus:ring-2
                    focus:ring-[#8b3905]/10
                  "
                />
              </div>

              {/* CITY STATE PINCODE */}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="City"
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-[#e7dfd8]
                      outline-none
                      text-sm
                      focus:border-[#8b3905]
                    "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    placeholder="State"
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-[#e7dfd8]
                      outline-none
                      text-sm
                      focus:border-[#8b3905]
                    "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode *
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    placeholder="Pincode"
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-[#e7dfd8]
                      outline-none
                      text-sm
                      focus:border-[#8b3905]
                    "
                  />
                </div>
              </div>

              {/* COUNTRY + ADDRESS TYPE */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>

                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-[#e7dfd8]
                      outline-none
                      text-sm
                      focus:border-[#8b3905]
                    "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Type
                  </label>

                  <select
                    name="address_type"
                    value={formData.address_type}
                    onChange={handleChange}
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-[#e7dfd8]
                      outline-none
                      text-sm
                      bg-white
                      focus:border-[#8b3905]
                    "
                  >
                    <option value="Home">Home</option>

                    <option value="Work">Work</option>

                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* DEFAULT CHECKBOX */}

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_default"
                  checked={formData.is_default}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#8b3905]"
                />

                <span className="text-sm text-gray-600">
                  Make this my default address
                </span>
              </label>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  disabled={saving}
                  className="
                    px-5
                    py-3
                    rounded-xl
                    border
                    border-[#e5ddd6]
                    text-sm
                    font-medium
                    text-gray-600
                    hover:bg-gray-50
                    transition
                    cursor-pointer
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="
                    px-6
                    py-3
                    rounded-xl
                    bg-[#8b3905]
                    text-white
                    text-sm
                    font-medium
                    hover:bg-[#742f04]
                    transition
                    cursor-pointer
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                  "
                >
                  {saving
                    ? "Saving..."
                    : editingAddress
                      ? "Update Address"
                      : "Save Address"}
                </button>
              </div>
            </form>
          </div>
          0
        </div>
      )}
    </div>
  );
};

export default Addresses;
