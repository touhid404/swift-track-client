import React from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from './../../../hooks/useAuth';

const Register = () => {


  const {createUser} = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(() => {
       console.log("User created successfully:", data.email);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
    console.log(data);
  };

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500";

  const errorText = (message) => (
    <p className="text-sm text-red-500 mt-1">{message}</p>
  );

  return (
    <div className="w-full max-w-md p-8">
      <h1 className="text-3xl font-bold mb-2 text-black mt-3.5">Create Account</h1>
      <p className="text-sm text-gray-600 mb-6">Register with SwiftTrack</p>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            {...register("fullName", { required: "Full Name is required" })}
            type="text"
            className={inputClass}
            placeholder="Full Name"
          />
          {errors.fullName && errorText(errors.fullName.message)}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email",
              },
            })}
            type="email"
            className={inputClass}
            placeholder="Email"
          />
          {errors.email && errorText(errors.email.message)}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            className={inputClass}
            placeholder="Password"
          />
          {errors.password && errorText(errors.password.message)}
        </div>

        {/* Profile Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Profile Image</label>
          <input
            {...register("profileImage", { required: "Profile image is required" })}
            type="file"
            accept="image/*"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-lime-400 file:text-white hover:file:bg-lime-500"
          />
          {errors.profileImage && errorText(errors.profileImage.message)}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-lime-400 hover:bg-lime-500 text-white font-semibold rounded-md"
        >
          Register
        </button>
      </form>

      <div className="mt-2 text-sm text-center text-gray-700">
        Already have an account?{" "}
        <Link to="/login" className="text-lime-600 font-semibold hover:underline">
          Login
        </Link>
      </div>

      <div className="my-2 flex items-center justify-center">
        <span className="text-gray-400">Or</span>
      </div>

      <button className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100">
        <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
        <span className="text-sm text-gray-700">Register with Google</span>
      </button>
    </div>
  );
};

export default Register;
