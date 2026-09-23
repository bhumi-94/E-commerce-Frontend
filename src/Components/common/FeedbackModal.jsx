import React, { useState } from "react";
import { X, Send, MessageSquare } from "lucide-react";
import { useSelector } from "react-redux";
import { submitFeedback } from "../../features/feedback/feedback.api";

const FeedbackModal = ({ isOpen, onClose }) => {
  const user = useSelector((state) => state.profile.user);
  const [feedbackText, setFeedbackText] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!isOpen) {
    return null;
  }
  const getProfileImage = () => {
    if (!user?.profile_image) {
      return null;
    }

    if (user.profile_image.startsWith("http")) {
      return user.profile_image;
    }

    return `http://localhost:3000${user.profile_image}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedbackText.trim()) {
      setMessage("Please enter your feedback.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await submitFeedback({
        feedbackText: feedbackText.trim(),
        city: city.trim(),
        country: country.trim(),
      });

      if (response.success) {
        setMessage("Thank you for your feedback!");

        setFeedbackText("");
        setCity("");
        setCountry("");

        setTimeout(() => {
          onClose();
          setMessage("");
        }, 1200);
      }
    } catch (error) {
      console.error("FEEDBACK SUBMIT ERROR:", error);

      setMessage(error.response?.data?.message || "Failed to submit feedback.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#54240e] px-6 py-5 text-white">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            <X size={19} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
              <MessageSquare size={21} />
            </div>

            <div>
              <h2 className="text-xl font-semibold">Share Your Feedback</h2>

              <p className="text-sm text-white/65">
                We'd love to hear from you
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* User */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#faf8f5] border border-[#eee6df]">
            {getProfileImage() ? (
              <img
                src={getProfileImage()}
                alt={user?.username || "User"}
                className="w-11 h-11 rounded-full object-cover"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-[#e8d5f5] flex items-center justify-center text-[#54240e] font-bold">
                {user?.username?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}

            <div>
              <p className="text-sm font-semibold text-[#211f1d]">
                {user?.username || "User"}
              </p>

              <p className="text-xs text-[#8d8580]">
                User ID: {user?.id || "—"}
              </p>
            </div>
          </div>

          {/* Feedback */}
          <div>
            <label className="block text-sm font-semibold text-[#211f1d] mb-2">
              Your Feedback
            </label>

            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Tell us about your experience..."
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-[#ded5cd] outline-none resize-none text-sm focus:border-[#8b3905]"
            />
          </div>

          {/* City + Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#211f1d] mb-2">
                City
              </label>

              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                className="w-full px-4 py-3 rounded-xl border border-[#ded5cd] outline-none text-sm focus:border-[#8b3905]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#211f1d] mb-2">
                Country
              </label>

              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter country"
                className="w-full px-4 py-3 rounded-xl border border-[#ded5cd] outline-none text-sm focus:border-[#8b3905]"
              />
            </div>
          </div>

          {/* Message */}
          {message && (
            <p className="text-center text-sm font-medium text-[#8b3905]">
              {message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#54240e] hover:bg-[#722e04] disabled:opacity-60 text-white font-semibold"
          >
            <Send size={17} />

            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
