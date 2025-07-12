import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import SocialLogin from '../social/SocialLogin';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500";

  const errorText = (message) => (
    <p className="text-sm text-red-500 mt-1">{message}</p>
  );

  return (
    <div className="w-full max-w-md p-8">
      <h1 className="text-3xl font-bold mb-2 text-black">Welcome Back</h1>
      <p className="text-sm text-gray-600 mb-6">Login with SwiftTrack</p>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
                message: "Password must be at least 6 characters long",
              },
            })}
            type="password"
            className={inputClass}
            placeholder="Password"
          />
          {errors.password && errorText(errors.password.message)}
        </div>

        {/* Forget Password */}
        <div className="text-right">
          <Link to="/forget-password" className="text-sm text-lime-600 hover:underline">
            Forget Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-lime-400 hover:bg-lime-500 text-white font-semibold rounded-md"
        >
          Login
        </button>
      </form>

      {/* Register Redirect */}
      <div className="mt-6 text-sm text-center text-gray-700">
        Don’t have any account?{" "}
        <Link to="/register" className="text-lime-600 font-semibold hover:underline">
          Register
        </Link>
      </div>

      {/* Divider */}
      <div className="my-4 flex items-center justify-center">
        <span className="text-gray-400">Or</span>
      </div>

      {/* Google Login */}
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
