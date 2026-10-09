import { useState } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { sendChatMessage } from "../../api/ai.api";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi! 👋 I'm Nexora AI. How can I help you today?",
    },
  ]);

  const handleSendMessage = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmedMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const data = await sendChatMessage(trimmedMessage);

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.reply || "Here are the products I found.",
        products: Array.isArray(data.products) ? data.products : [],
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("CHATBOT ERROR:", error);

      const errorMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Sorry, something went wrong. Please try again.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#8b3905] text-white shadow-lg transition hover:scale-105"
          aria-label="Open Nexora AI"
        >
          <MessageCircle size={25} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[550px] w-[360px] flex-col overflow-hidden rounded-2xl border border-[#e5ded7] bg-[#fcfbf8] shadow-2xl sm:w-[390px]">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#8b3905] px-4 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                <Bot size={22} />
              </div>

              <div>
                <h3 className="font-semibold">Nexora AI</h3>
                <p className="text-xs text-white/80">Your shopping assistant</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 transition hover:bg-white/10"
              aria-label="Close chatbot"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((item) => (
              <div
                key={item.id}
                className={`flex ${
                  item.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[85%] items-end gap-2 ${
                    item.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      item.sender === "user"
                        ? "bg-[#211f1d] text-white"
                        : "bg-[#f0e7df] text-[#8b3905]"
                    }`}
                  >
                    {item.sender === "user" ? (
                      <User size={14} />
                    ) : (
                      <Bot size={14} />
                    )}
                  </div>
                  <div
                    className={`max-w-full rounded-2xl px-4 py-3 text-sm leading-6 ${
                      item.sender === "user"
                        ? "rounded-br-md bg-[#211f1d] text-white"
                        : "rounded-bl-md bg-white text-[#211f1d] shadow-sm"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{item.text}</p>

                    {item.sender === "bot" &&
                      item.products?.map((product) => (
                        <div
                          key={product.id}
                          className="mt-3 overflow-hidden rounded-xl border border-[#e5ded7] bg-[#fcfbf8]"
                        >
                          {product.image && (
                            <img
                              src={
                                product.image.startsWith("http://") ||
                                product.image.startsWith("https://")
                                  ? product.image
                                  : `${import.meta.env.VITE_BACKEND_URL}${product.image.startsWith("/") ? "" : "/"}${product.image}`
                              }
                              alt={product.name}
                              className="h-36 w-full object-contain bg-white p-2"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          )}

                          <div className="p-3">
                            <h4 className="font-semibold text-[#211f1d]">
                              {product.name}
                            </h4>

                            <p className="mt-1 font-bold text-[#8b3905]">
                              ₹{Number(product.price).toLocaleString("en-IN")}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {product.stock_quantity > 0
                                ? "In stock"
                                : "Currently unavailable"}
                            </p>

                            <button
                              type="button"
                              onClick={() => {
                                window.location.href = `/product-details/${product.id}`;
                              }}
                              className="mt-3 w-full rounded-lg bg-[#8b3905] px-3 py-2 font-medium text-white transition hover:opacity-90"
                            >
                              View Product
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                  {/* <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                      item.sender === "user"
                        ? "rounded-br-md bg-[#211f1d] text-white"
                        : "rounded-bl-md bg-white text-[#211f1d] shadow-sm"
                    }`}
                  >
                    {item.text}
                  </div> */}
                </div>
              </div>
            ))}

            {/* Loading */}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm text-gray-500 shadow-sm">
                  <span>Nexora AI is typing</span>

                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-[#e5ded7] bg-white p-3">
            <div className="flex items-center gap-2 rounded-xl border border-[#ddd4cc] bg-[#fcfbf8] px-3 py-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Nexora AI..."
                disabled={loading}
                className="min-w-0 flex-1 bg-transparent text-sm text-[#211f1d] outline-none placeholder:text-gray-400"
              />

              <button
                onClick={handleSendMessage}
                disabled={loading || !message.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#8b3905] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </div>

            <p className="mt-2 text-center text-[10px] text-gray-400">
              Powered by Nexora AI
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
