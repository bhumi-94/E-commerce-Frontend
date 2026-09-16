import React, { useEffect, useRef, useState } from "react";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Edit,
  CheckCircle,
  Camera,
} from "lucide-react";
import Loading from "../../Components/common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, saveProfile } from "../../features/profile/ProfileSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, updating, error, successMessage } = useSelector(
    (state) => state.profile,
  );
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    date_of_birth: "",
    gender: "",
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone: user.phone || "",
        date_of_birth: user.date_of_birth
          ? user.date_of_birth.substring(0, 10)
          : "",
        gender: user.gender || "",
      });

      if (user.profile_image) {
        setPreviewImage(`http://localhost:3000${user.profile_image}`);
      } else {
        setPreviewImage(null);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // Allowed image types
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      alert("Please select a JPG, JPEG, PNG or WEBP image.");

      e.target.value = "";
      return;
    }

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Profile image must be less than 5 MB.");

      e.target.value = "";
      return;
    }

    // Store actual file
    setSelectedImage(file);

    // Create preview
    const imageUrl = URL.createObjectURL(file);

    setPreviewImage(imageUrl);
  };

  const handleSave = async () => {
    const data = new FormData();
    data.append("first_name", formData.first_name);
    data.append("last_name", formData.last_name);
    data.append("phone", formData.phone);
    data.append("date_of_birth", formData.date_of_birth);
    data.append("gender", formData.gender);

    if (selectedImage) {
      data.append("profile_image", selectedImage);
    }

    const result = await dispatch(saveProfile(data));

    // Save successful
    if (saveProfile.fulfilled.match(result)) {
      setIsEditing(false);
      setSelectedImage(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);

    setSelectedImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Restore original image from DB
    if (user?.profile_image) {
      setPreviewImage(`http://localhost:3000${user.profile_image}`);
    } else {
      setPreviewImage(null);
    }

    // Restore original form values
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone: user.phone || "",
        date_of_birth: user.date_of_birth
          ? user.date_of_birth.substring(0, 10)
          : "",
        gender: user.gender || "",
      });
    }
  };
  if (loading) {
    return (
      <Loading />
      // <div className="min-h-screen flex items-center justify-center bg-[#fcfbf8]">
      //   <p className="text-[#8b3905] font-medium">Loading profile...</p>
      // </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfbf8]">
        <p className="text-red-500">{error || "Unable to load profile"}</p>
      </div>
    );
  }

  const profileInitial = user.first_name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-[#f8f8f7] px-6 py-10">
      <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
        {/* SIDEBAR */}

        <aside className="bg-white rounded-[24px] overflow-hidden border border-[#eeeae5]">
          {/* User */}

          <div className="bg-[#fffaf0] px-7 py-8">
            <div className="w-[70px] h-[70px] rounded-[18px] overflow-hidden bg-[#e8e8e8] mb-5">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-[#8b3905]">
                  {profileInitial}
                </div>
              )}
            </div>

            <h2 className="text-lg font-bold text-[#211f1d]">
              {user.first_name} {user.last_name}
            </h2>

            <p className="text-sm text-[#9b948e] mt-1 break-all">
              {user.email}
            </p>
          </div>

          {/* Navigation */}

          <nav className="p-3 space-y-1">
            <button className="w-full flex items-center gap-4 px-5 py-4 rounded-xl bg-[#fff9e9] text-[#8b3905]">
              <User size={21} />
              Profile
            </button>

            <button className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-[#4c4845] hover:bg-[#faf8f5]">
              <Package size={21} />
              My Orders
            </button>

            <button className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-[#4c4845] hover:bg-[#faf8f5]">
              <Heart size={21} />
              Wishlist
            </button>

            <button className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-[#4c4845] hover:bg-[#faf8f5]">
              <MapPin size={21} />
              Addresses
            </button>

            <button className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-[#4c4845] hover:bg-[#faf8f5]">
              <CreditCard size={21} />
              Payment Methods
            </button>

            <button className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-[#4c4845] hover:bg-[#faf8f5]">
              <Bell size={21} />
              Notifications
            </button>

            <button className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-[#4c4845] hover:bg-[#faf8f5]">
              <Settings size={21} />
              Settings
            </button>

            <button className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-red-500 hover:bg-red-50">
              <LogOut size={21} />
              Logout
            </button>
          </nav>
        </aside>

        {/* PROFILE CONTENT */}

        <main className="bg-white rounded-[24px] border border-[#eeeae5] p-8 lg:p-10">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-2xl font-bold text-[#211f1d]">My Profile</h1>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 border border-[#e5dfd9] px-6 py-3 rounded-xl font-medium hover:border-[#8b3905] hover:text-[#8b3905] transition"
              >
                <Edit size={18} />
                Edit Profile
              </button>
            )}
          </div>

          {/* PROFILE HEADER */}

          <div className="flex items-center gap-7 mb-12">
            {/* PROFILE IMAGE */}

            <div className="relative">
              <div className="w-[115px] h-[115px] rounded-[20px] overflow-hidden bg-[#e8e8e8] flex items-center justify-center">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-[#8b3905]">
                    {profileInitial}
                  </span>
                )}
              </div>

              {/* CAMERA BUTTON ONLY WHILE EDITING */}

              {isEditing && (
                <>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[#8b3905] text-white flex items-center justify-center border-4 border-white hover:bg-[#743004] transition"
                    title="Change profile photo"
                  >
                    <Camera size={18} />
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#211f1d]">
                {user.first_name} {user.last_name}
              </h2>

              <p className="text-[#9b948e] mt-1">{user.email}</p>

              <div className="flex items-center gap-2 text-green-600 text-sm mt-3">
                <CheckCircle size={16} />
                Verified account
              </div>
            </div>
          </div>

          {/* SUCCESS */}

          {successMessage && (
            <div className="mb-6 bg-green-50 text-green-700 px-4 py-3 rounded-xl">
              {successMessage}
            </div>
          )}

          {/* ERROR */}

          {error && (
            <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* FORM */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {/* FIRST NAME */}

            <div>
              <label className="block text-sm font-medium mb-2 text-[#3e3935]">
                First Name
              </label>

              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-5 py-4 rounded-xl bg-[#fafafa] border border-transparent focus:border-[#d9c5b6] outline-none disabled:text-[#77716d]"
              />
            </div>

            {/* LAST NAME */}

            <div>
              <label className="block text-sm font-medium mb-2 text-[#3e3935]">
                Last Name
              </label>

              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-5 py-4 rounded-xl bg-[#fafafa] border border-transparent focus:border-[#d9c5b6] outline-none disabled:text-[#77716d]"
              />
            </div>

            {/* EMAIL */}

            <div>
              <label className="block text-sm font-medium mb-2 text-[#3e3935]">
                Email Address
              </label>

              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-5 py-4 rounded-xl bg-[#fafafa] border border-transparent text-[#77716d] outline-none"
              />
            </div>

            {/* PHONE */}

            <div>
              <label className="block text-sm font-medium mb-2 text-[#3e3935]">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-5 py-4 rounded-xl bg-[#fafafa] border border-transparent focus:border-[#d9c5b6] outline-none disabled:text-[#77716d]"
              />
            </div>

            {/* DOB */}

            <div>
              <label className="block text-sm font-medium mb-2 text-[#3e3935]">
                Date of Birth
              </label>

              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-5 py-4 rounded-xl bg-[#fafafa] border border-transparent focus:border-[#d9c5b6] outline-none disabled:text-[#77716d]"
              />
            </div>

            {/* GENDER */}

            <div>
              <label className="block text-sm font-medium mb-2 text-[#3e3935]">
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-5 py-4 rounded-xl bg-[#fafafa] border border-transparent focus:border-[#d9c5b6] outline-none disabled:text-[#77716d]"
              >
                <option value="">Select Gender</option>

                <option value="male">Male</option>

                <option value="female">Female</option>

                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* SAVE BUTTON */}

          {isEditing && (
            <div className="flex justify-end gap-4 mt-10">
              <button
                type="button"
                onClick={handleCancel}
                disabled={updating}
                className="px-7 py-3 rounded-xl border border-[#ddd6d0] font-medium"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={updating}
                className="px-7 py-3 rounded-xl bg-[#8b3905] text-white font-medium disabled:opacity-60"
              >
                {updating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
