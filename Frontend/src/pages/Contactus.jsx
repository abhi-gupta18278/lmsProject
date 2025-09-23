import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { isEmail } from "../Regex/validater";

function Contact() {
  const navigate = useNavigate()
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("All fields are mandatory");
      return;
    }

    if (!isEmail(userInput.email)) {
      toast.error("Invalid email");
      return;
    }
    toast.success("From successfull submit")
    setUserInput({
      name: "",
      email: "",
      message: "",
    });
    navigate("/")

  }

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 py-12">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
          Contact Us
        </h1>
        <p className="text-gray-400 mb-10 text-center max-w-lg">
          Have questions, feedback, or need support? Fill out the form below or
          reach us directly.
        </p>

        {/* Contact Form */}
        <form
          onSubmit={onFormSubmit}
          className="w-full max-w-lg bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6"
          noValidate
        >
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Your Name
            </label>
            <input
              type="text"
              required
              id="name"
              name="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
              value={userInput.name}
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              required
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
              value={userInput.email}
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium">
              Message
            </label>
            <textarea
              rows="4"
              required
              id="message"
              name="message"
              placeholder="Write your message..."
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
              value={userInput.message}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 px-4 rounded-lg font-semibold cursor-pointer"
          >
            Contact Us
          </button>
        </form>

        {/* Extra Info */}
        <div className="mt-12 flex flex-col text-center text-gray-400 space-y-2">
          <a
            className="bg-[#0c111c] px-1 py-3 border-[1px solid black] rounded-md text-xl font-medium"
            href="mailto:abhigupta18278@gmail.com"
          >
            📧 abhigupta18278@gmail.com
          </a>
          <a
            className="bg-[#0c111c] py-3 border-[1px solid black] rounded-md text-xl font-medium"
            href="tel:+917900899067"
          >
            📞 +91 7900899067
          </a>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Contact;