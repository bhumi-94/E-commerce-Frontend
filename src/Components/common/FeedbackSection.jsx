import React, { useState } from "react";
import { MessageSquare, ArrowRight } from "lucide-react";

import FeedbackModal from "./FeedbackModal";

const FeedbackSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="w-full px-6 lg:px-10 py-10">
        <div className="max-w-[1200px] mx-auto rounded-3xl bg-[#f3ece5] border border-[#eaded2] px-6 sm:px-10 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#54240e] text-white flex items-center justify-center">
                <MessageSquare size={25} />
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#211f1d]">
                  We'd Love Your Feedback
                </h2>

                <p className="mt-1 text-sm text-[#8d8580]">
                  Tell us about your experience with Nexora.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-[#54240e] hover:bg-[#722e04] text-white font-semibold transition"
            >
              Give Feedback
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default FeedbackSection;
