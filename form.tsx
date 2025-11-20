import React from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  description: string;
}
interface FormProps {
  setgo: React.Dispatch<React.SetStateAction<boolean>>;
  setdoe: React.Dispatch<React.SetStateAction<boolean>>;
  setisNew: React.Dispatch<React.SetStateAction<boolean>>;
  setyeso: React.Dispatch<React.SetStateAction<FormData>>;
}
const Form = ({ setgo, setdoe, setisNew, setyeso }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    setTimeout(() => {
      setdoe(false);
    }, 500);

    setTimeout(() => {
      setgo(false);
    }, 2000);

    setTimeout(() => {
      setisNew(true);
    }, 2500);
    setyeso(data);
  };
  return (
    <AnimatePresence>
      <motion.form
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", ease: "backInOut" }}
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-24 w-400 h-210 p-5 bg-black ring-2 text-4xl text-white rounded-lg"
      >
        <label>
          Name:
          <input
            {...register("name", { required: "Name is required" })}
            className="text-white w-full h-30 p-2 rounded mt-1"
          />
          {errors.name && (
            <p className="text-red-400 text-3xl">{errors.name.message}</p>
          )}
        </label>
        <label>
          Description:
          <input
            {...register("description", { required: "what you believe ?" })}
            className="text-white w-full p-2 h-30 rounded mt-1"
          />
          {errors.description && (
            <p className="text-red-500 text-3xl">
              {errors.description.message}
            </p>
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
          />
          {errors.email && (
            <p className="text-red-400 text-3xl">{errors.email.message}</p>
          )}
        </label>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 rounded relative bottom-10 p-2 font-semibold"
        >
          Submit
        </button>
      </motion.form>
    </AnimatePresence>
  );
};

export default Form;
