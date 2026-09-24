import React, { useEffect, useRef, useState } from "react";
import { Edit, CheckCircle, Camera } from "lucide-react";
import Loading from "../../Components/common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { saveProfile } from "../../features/profile/ProfileSlice";

const ProfileHome = () => {
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

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      alert("Please select a JPG, JPEG, PNG or WEBP image.");

      e.target.value = "";

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Profile image must be less than 5 MB.");

      e.target.value = "";

      return;
    }

    setSelectedImage(file);

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

    if (user?.profile_image) {
      setPreviewImage(`http://localhost:3000${user.profile_image}`);
    } else {
      setPreviewImage(null);
    }

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
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-white rounded-[24px]">
        <p className="text-red-500">{error || "Unable to load profile"}</p>
      </div>
    );
  }

  const profileInitial = user.first_name?.charAt(0)?.toUpperCase() || "U";

  return (
    <main className="bg-white rounded-[24px] border border-[#eeeae5] p-6 lg:p-10">
      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold text-[#211f1d]">My Profile</h1>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="
              flex items-center gap-2
              border border-[#e5dfd9]
              px-6 py-3
              rounded-xl
              font-medium
              hover:border-[#8b3905]
              hover:text-[#8b3905]
              transition
            "
          >
            <Edit size={18} />
            Edit Profile
          </button>
        )}
      </div>

      {/* ================= PROFILE HEADER ================= */}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12">
        {/* PROFILE IMAGE */}

        <div className="relative">
          <div
            className="
              w-[115px]
              h-[115px]
              rounded-[20px]
              overflow-hidden
              bg-[#e8e8e8]
              flex
              items-center
              justify-center
            "
          >
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

          {/* CAMERA */}

          {isEditing && (
            <>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="
                  absolute
                  -bottom-2
                  -right-2
                  w-10
                  h-10
                  rounded-full
                  bg-[#8b3905]
                  text-white
                  flex
                  items-center
                  justify-center
                  border-4
                  border-white
                  hover:bg-[#743004]
                  transition
                "
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

        {/* USER INFO */}

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

      {/* ================= SUCCESS ================= */}

      {successMessage && (
        <div className="mb-6 bg-green-50 text-green-700 px-4 py-3 rounded-xl">
          {successMessage}
        </div>
      )}

      {/* ================= ERROR ================= */}

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* ================= FORM ================= */}

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
            className="
              w-full
              px-5
              py-4
              rounded-xl
              bg-[#fafafa]
              border
              border-transparent
              focus:border-[#d9c5b6]
              outline-none
              disabled:text-[#77716d]
            "
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
            className="
              w-full
              px-5
              py-4
              rounded-xl
              bg-[#fafafa]
              border
              border-transparent
              focus:border-[#d9c5b6]
              outline-none
              disabled:text-[#77716d]
            "
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
            className="
              w-full
              px-5
              py-4
              rounded-xl
              bg-[#fafafa]
              border
              border-transparent
              text-[#77716d]
              outline-none
            "
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
            className="
              w-full
              px-5
              py-4
              rounded-xl
              bg-[#fafafa]
              border
              border-transparent
              focus:border-[#d9c5b6]
              outline-none
              disabled:text-[#77716d]
            "
          />
        </div>

        {/* DATE OF BIRTH */}

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
            className="
              w-full
              px-5
              py-4
              rounded-xl
              bg-[#fafafa]
              border
              border-transparent
              focus:border-[#d9c5b6]
              outline-none
              disabled:text-[#77716d]
            "
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
            className="
              w-full
              px-5
              py-4
              rounded-xl
              bg-[#fafafa]
              border
              border-transparent
              focus:border-[#d9c5b6]
              outline-none
              disabled:text-[#77716d]
            "
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* ================= SAVE / CANCEL ================= */}

      {isEditing && (
        <div className="flex justify-end gap-4 mt-10">
          <button
            type="button"
            onClick={handleCancel}
            disabled={updating}
            className="
              px-7
              py-3
              rounded-xl
              border
              border-[#ddd6d0]
              font-medium
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={updating}
            className="
              px-7
              py-3
              rounded-xl
              bg-[#8b3905]
              text-white
              font-medium
              disabled:opacity-60
            "
          >
            {updating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}
    </main>
  );
};

export default ProfileHome;
