import React, { useEffect, useState } from "react";
import { Quote, MapPin } from "lucide-react";
import { getFeedback } from "../../features/feedback/feedback.api";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await getFeedback();
        console.log("FEEDBACK RESPONSE:", response);
        const feedback = response?.feedback || [];

        const shuffled = [...feedback].sort(() => Math.random() - 0.5);
        setTestimonials(shuffled.slice(0, 3));
      } catch (error) {
        console.error("TESTIMONIAL ERROR:", error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const getProfileImage = (profileImage) => {
    if (!profileImage) {
      return null;
    }

    if (profileImage.startsWith("http")) {
      return profileImage;
    }

    return `http://localhost:3000${profileImage}`;
  };

  if (loading) {
    return (
      <section className="w-full py-14">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({
              length: 3,
            }).map((_, index) => (
              <div
                key={index}
                className="h-64 rounded-3xl bg-[#f0ebe6] animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-14">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-[2px] text-[#a14b0b]">
            Customer Stories
          </p>

          <h2 className="mt-2 font-serif text-3xl lg:text-4xl font-bold text-[#211f1d]">
            What Our Customers Say
          </h2>

          <p className="mt-2 text-[#8d8580]">
            Real experiences from the Nexora community
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => {
            const profileImage = getProfileImage(testimonial.profile_image);

            return (
              <div
                key={testimonial.id}
                className="relative bg-white rounded-3xl border border-[#eaded2] p-6 shadow-sm hover:shadow-md transition"
              >
                {/* Quote */}
                <div className="w-10 h-10 rounded-xl bg-[#f3ece5] text-[#8b3905] flex items-center justify-center mb-5">
                  <Quote size={20} />
                </div>

                {/* Feedback */}
                <p className="text-[#514b47] text-sm leading-7 min-h-[90px]">
                  "{testimonial.feedback_text}"
                </p>

                {/* User */}
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-[#eee6df]">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={testimonial.first_name}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-[#e8d5f5] flex items-center justify-center text-[#54240e] font-bold">
                      {testimonial.username?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-semibold text-[#211f1d]">
                      {testimonial.username}
                    </p>

                    {(testimonial.city || testimonial.country) && (
                      <div className="flex items-center gap-1 text-xs text-[#8d8580] mt-1">
                        <MapPin size={12} />

                        <span>
                          {[testimonial.city, testimonial.country]
                            .filter(Boolean)
                            .join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
