import React, { useState } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from './../../../hooks/useAuth';
import SocialLogin from '../social/SocialLogin';
import Alert from '../../shared/alert/Alert';
import axios from 'axios';
import useAxios from './../../../hooks/useAxios';
const Register = () => {

  const [profileImageUrl, setProfileImageUrl] = useState('');
   const axiosInstance = useAxios();;

  const {createUser, updateUserProfile} = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(async() => {


        const userInfo = {
          fullName: data.fullName,
          email: data.email,
          profileImage: profileImageUrl,
          role: "user" ,
          creationDate: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        }


        const userRes = await axiosInstance.post('/users', userInfo);
        console.log(userRes)
        

       const userProfile = {
          displayName: data.fullName,
          photoURL: profileImageUrl
       }
       updateUserProfile(userProfile).then(()=>{
        Alert('success', 'Profile updated successfully');
        console.log("Profile updated successfully:", userProfile);
       }).catch((error) => {
        Alert('error', 'Profile update failed', error.message || 'Unknown error');
        console.error("Error updating profile:", error);
       });
       // Here you can also send the user data to your backend or database
       // For example, using axios to send a POST request
      })
      .catch((error) => {
        Alert('error', 'User creation failed', error.message || 'Unknown error');
        console.error("Error creating user:", error);
      });
  };


  const handleImageUpload = async(event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Img_Upload_Key}`, formData);


    if (res.data.success) {
      setProfileImageUrl(res.data.data.url);
    } else {
      setProfileImageUrl('');
    }
  }


  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500";

  const errorText = (message) => (
    <p className="text-sm text-red-500 mt-1">{message}</p>
  );

  return (
    <div className="w-full max-w-md p-7">
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
            onChange={handleImageUpload}
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

      {/* Google Login */}
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
