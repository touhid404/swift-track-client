import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Alert from '../shared/alert/Alert';
import useAuth from './../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import img1 from '../../assets/agent-pending.png';

const BeARider = () => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();
  const [selectedRegion, setSelectedRegion] = useState("");

  const regions = [...new Set(serviceCenters.map(center => center.region))];

  const getWarehouses = (region) => {
    return serviceCenters
      .filter(center => center.region === region)
      .map(center => center.city);
  };

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500";

  const errorText = (message) => (
    <p className="text-sm text-red-500 mt-1">{message}</p>
  );

  const onSubmit = async (data) => {
    data.status = "pending";
    data.createdAt = new Date().toISOString();

      const res = await axiosSecure.post('/riders', data);
      if (res.data.insertedId) {
        Alert("success",  "Rider application submitted!");
      } else {
        Alert("error", "Submission failed.");
      }
      reset();

  };

  return (
    <div className="mx-auto px-4 py-12 flex flex-col lg:flex-row items-center justify-between">
      {/* Left - Form */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Be a Rider</h2>
        <p className="text-gray-600 mb-6">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name & Age */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-1/2">
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                className={inputClass}
                placeholder="Your Name"
                defaultValue={user.displayName}
                readOnly
              />
              {errors.name && errorText(errors.name.message)}
            </div>
            <div className="w-full lg:w-1/2">
              <input
                {...register("age", { required: "Age is required" })}
                type="number"
                className={inputClass}
                placeholder="Your Age"
              />
              {errors.age && errorText(errors.age.message)}
            </div>
          </div>

          {/* Email & Region */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-1/2">
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
                placeholder="Your Email"
                readOnly
                defaultValue={user.email}
              />
              {errors.email && errorText(errors.email.message)}
            </div>
            <div className="w-full lg:w-1/2">
              <select
                {...register("region", { required: "Region is required" })}
                className={inputClass}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="">Select your region</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              {errors.region && errorText(errors.region.message)}
            </div>
          </div>

          {/* NID & Contact */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-1/2">
              <input
                {...register("nid", { required: "NID is required" })}
                type="text"
                className={inputClass}
                placeholder="NID No"
              />
              {errors.nid && errorText(errors.nid.message)}
            </div>
            <div className="w-full lg:w-1/2">
              <input
                {...register("contact", { required: "Contact number is required" })}
                type="text"
                className={inputClass}
                placeholder="Contact"
              />
              {errors.contact && errorText(errors.contact.message)}
            </div>
          </div>

          {/* Warehouse & Bike Brand */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-1/2">
              <select
                {...register("warehouse", { required: "Select a warehouse" })}
                className={inputClass}
              >
                <option value="">Select warehouse</option>
                {getWarehouses(selectedRegion).map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {errors.warehouse && errorText(errors.warehouse.message)}
            </div>
            <div className="w-full lg:w-1/2">
              <input
                {...register("bikeBrand", { required: "Bike brand is required" })}
                type="text"
                className={inputClass}
                placeholder="Bike Brand"
              />
              {errors.bikeBrand && errorText(errors.bikeBrand.message)}
            </div>
          </div>

          {/* Bike Model & License No */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-1/2">
              <input
                {...register("bikeModel", { required: "Bike model is required" })}
                type="text"
                className={inputClass}
                placeholder="Bike Model"
              />
              {errors.bikeModel && errorText(errors.bikeModel.message)}
            </div>
            <div className="w-full lg:w-1/2">
              <input
                {...register("licenseNo", { required: "License number is required" })}
                type="text"
                className={inputClass}
                placeholder="Driving License Number"
              />
              {errors.licenseNo && errorText(errors.licenseNo.message)}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-lime-400 hover:bg-lime-500 text-white font-semibold rounded-md"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Right - Image */}
      <div className="w-full lg:w-1/2 mt-10 lg:mt-0  justify-center hidden lg:flex">
        <img
          src={img1}
          alt="Rider"
          className="max-w-xs md:max-w-md"
        />
      </div>
    </div>
  );
};

export default BeARider;
