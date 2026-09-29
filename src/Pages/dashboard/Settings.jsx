import React, { useEffect, useState } from "react";
import {
  Bell,
  Mail,
  ShoppingBag,
  Megaphone,
  Sun,
  Moon,
  Save,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettings,
  saveSettings,
} from "../../features/settings/settingsSlice";
import Loading from "../../Components/common/Loading";

const Settings = () => {
  const dispatch = useDispatch();

  const { settings, loading, saving, error } = useSelector(
    (state) => state.settings,
  );

  const [formData, setFormData] = useState({
    email_notifications: true,
    order_notifications: true,
    promotional_notifications: true,
    theme: "light",
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    if (!settings) return;

    setFormData({
      email_notifications: Boolean(settings.email_notifications),

      order_notifications: Boolean(settings.order_notifications),

      promotional_notifications: Boolean(settings.promotional_notifications),

      theme: settings.theme || "light",
    });
  }, [settings]);

  const handleToggle = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));

    setSuccessMessage("");
  };

  const handleThemeChange = (theme) => {
    setFormData((prev) => ({
      ...prev,
      theme,
    }));

    setSuccessMessage("");
  };

  const handleSave = async () => {
    setSuccessMessage("");

    const result = await dispatch(saveSettings(formData));

    if (saveSettings.fulfilled.match(result)) {
      setSuccessMessage("Settings saved successfully.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#FCFBF3] px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-[1000px] mx-auto">
        <div className="mb-7">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#211f1d]">
            Settings
          </h1>

          <p className="mt-2 text-sm text-[#8b8179]">
            Manage your account preferences and notification settings.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-5 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600">
            {successMessage}
          </div>
        )}

        <section className="bg-white rounded-[22px] border border-[#eee7df] overflow-hidden">
          <div className="px-5 sm:px-7 py-5 border-b border-[#eee7df]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f6eafa] flex items-center justify-center">
                <Bell size={20} className="text-[#8b5aa8]" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#211f1d]">
                  Notifications
                </h2>

                <p className="text-sm text-[#8b8179]">
                  Choose which notifications you want to receive.
                </p>
              </div>
            </div>
          </div>

          <div className="px-5 sm:px-7 py-5 border-b border-[#eee7df] flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#faf8f5] flex items-center justify-center">
                <Mail size={19} className="text-[#8b3905]" />
              </div>

              <div>
                <h3 className="font-medium text-[#211f1d]">
                  Email Notifications
                </h3>

                <p className="text-sm text-[#8b8179] mt-1">
                  Receive important updates through email.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleToggle("email_notifications")}
              className={`
                relative
                w-12
                h-6
                rounded-full
                transition
                shrink-0
                ${formData.email_notifications ? "bg-[#8b3905]" : "bg-gray-300"}
              `}
            >
              <span
                className={`
                  absolute
                  top-1
                  w-4
                  h-4
                  bg-white
                  rounded-full
                  transition
                  ${formData.email_notifications ? "left-7" : "left-1"}
                `}
              />
            </button>
          </div>
          <div className="px-5 sm:px-7 py-5 border-b border-[#eee7df] flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#faf8f5] flex items-center justify-center">
                <ShoppingBag size={19} className="text-[#8b3905]" />
              </div>

              <div>
                <h3 className="font-medium text-[#211f1d]">
                  Order Notifications
                </h3>

                <p className="text-sm text-[#8b8179] mt-1">
                  Get updates about your orders.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleToggle("order_notifications")}
              className={`
                relative
                w-12
                h-6
                rounded-full
                transition
                shrink-0
                ${formData.order_notifications ? "bg-[#8b3905]" : "bg-gray-300"}
              `}
            >
              <span
                className={`
                  absolute
                  top-1
                  w-4
                  h-4
                  bg-white
                  rounded-full
                  transition
                  ${formData.order_notifications ? "left-7" : "left-1"}
                `}
              />
            </button>
          </div>

          <div className="px-5 sm:px-7 py-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#faf8f5] flex items-center justify-center">
                <Megaphone size={19} className="text-[#8b3905]" />
              </div>

              <div>
                <h3 className="font-medium text-[#211f1d]">
                  Promotional Notifications
                </h3>

                <p className="text-sm text-[#8b8179] mt-1">
                  Receive offers and promotional updates.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleToggle("promotional_notifications")}
              className={`
                relative
                w-12
                h-6
                rounded-full
                transition
                shrink-0
                ${
                  formData.promotional_notifications
                    ? "bg-[#8b3905]"
                    : "bg-gray-300"
                }
              `}
            >
              <span
                className={`
                  absolute
                  top-1
                  w-4
                  h-4
                  bg-white
                  rounded-full
                  transition
                  ${formData.promotional_notifications ? "left-7" : "left-1"}
                `}
              />
            </button>
          </div>
        </section>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="
              flex
              items-center
              justify-center
              gap-2
              px-6
              py-3
              rounded-xl
              bg-[#8b3905]
              text-white
              text-sm
              font-medium
              hover:bg-[#743004]
              disabled:opacity-60
              disabled:cursor-not-allowed
              transition
            "
          >
            <Save size={18} />

            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
