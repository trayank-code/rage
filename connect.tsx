import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  query: string;
  contact: string;
  country: string;
}

interface navigateprops {
  onClose: () => void;
}

const countries = [
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
];

const Connect = ({ onClose }: navigateprops) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      country: "IN",
      contact: "",
      name: "",
      email: "",
      query: "",
    },
  });

  const validateContact = (value: string) => {
    if (!value) return "Contact number is required";
    const digitsOnly = value.replace(/\D/g, "");

    if (digitsOnly.length !== 10) {
      return "Contact number must be exactly 10 digits";
    }

    if (selectedCountry.code === "IN") {
      if (!/^[6-9]/.test(digitsOnly)) {
        return "Indian mobile numbers must start with 6, 7, 8, or 9";
      }
    }

    return true;
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const completeContact = `${
        selectedCountry.dialCode
      }${data.contact.replace(/\D/g, "")}`;
      const completeData = {
        ...data,
        contact: completeContact,
        country: selectedCountry.code,
      };

      // Send to backend
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completeData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitMessage("✅ Form submitted successfully!");
        console.log("Success:", result);

        // Reset form after 2 seconds
        setTimeout(() => {
          reset();
          onClose();
        }, 2000);
      } else {
        setSubmitMessage(`❌ Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitMessage("❌ Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find((c) => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
    }
  };

  return (
    <AnimatePresence>
      <motion.form
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", ease: "backInOut" }}
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-24 w-400 h-300 p-5 bg-black ring-2 text-4xl absolute justify-self-center z-200 text-white rounded-lg"
      >
        {/* Submit Message */}
        {submitMessage && (
          <div
            className={`text-2xl p-2 rounded ${
              submitMessage.includes("✅") ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {submitMessage}
          </div>
        )}

        <label>
          Name:
          <input
            {...register("name", { required: "Name is required" })}
            className="text-white w-full h-30 p-2 rounded mt-1"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-red-400 text-3xl">{errors.name.message}</p>
          )}
        </label>

        <label>
          Query:
          <input
            {...register("query", { required: "Enter your query, please" })}
            className="text-white w-full p-2 h-30 rounded mt-1"
            disabled={isSubmitting}
          />
          {errors.query && (
            <p className="text-red-500 text-3xl">{errors.query.message}</p>
          )}
        </label>

        <label>
          Email:
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="text-white w-full h-30 p-2 rounded mt-1"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-red-400 text-3xl">{errors.email.message}</p>
          )}
        </label>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Contact:</label>
          <div className="flex gap-2">
            <select
              {...register("country")}
              value={selectedCountry.code}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="text-black bg-white p-2 rounded w-32 h-20"
              disabled={isSubmitting}
            >
              {countries.map((country) => (
                <option
                  className="w-30 h-50 text-xl"
                  key={country.code}
                  value={country.code}
                >
                  {country.flag} {country.name} ({country.dialCode})
                </option>
              ))}
            </select>

            <input
              {...register("contact", {
                required: "Contact number is required",
                validate: validateContact,
              })}
              placeholder="Enter 10-digit number"
              className="text-black text-3xl w-full p-2 rounded bg-white"
              disabled={isSubmitting}
            />
          </div>
          {errors.contact && (
            <p className="text-red-400 text-xl">{errors.contact.message}</p>
          )}

          <p className="text-gray-400 text-2xl">
            Enter {selectedCountry.name} mobile number without country code (10
            digits)
          </p>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 rounded relative bottom-10 p-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </motion.form>
    </AnimatePresence>
  );
};

export default Connect;
