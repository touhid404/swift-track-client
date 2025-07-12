import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from 'sweetalert2';
import useAuth from "../../hooks/useAuth";

  const generateTrackingId = () => {
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString().slice(-5);
  return `TRK-${randomStr}-${timestamp}`;
};
const SendParcel = () => {


    const { user} = useAuth();


  const serviceCenters = useLoaderData();
    
  const [selectedSenderRegion, setSelectedSenderRegion] = useState("");
  const [selectedReceiverRegion, setSelectedReceiverRegion] = useState("");

  // Extract unique regions
  const regions = [...new Set(serviceCenters.map(item => item.region))];

  // Get warehouses (cities) by region
  const getWarehouses = (region) => {
    return serviceCenters
      .filter(center => center.region === region)
      .map(center => center.city);
  };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  
  const onSubmit = (data) => {
  const price = calculatePrice(
    data.parcelType,
    data.parcelWeight,
    data.senderRegion,
    data.receiverRegion
  );

  Swal.fire({
    title: 'Confirm Booking',
    html: `
      <p><strong>Parcel Type:</strong> ${data.parcelType}</p>
      <p><strong>Weight:</strong> ${data.parcelWeight} KG</p>
      <p><strong>From:</strong> ${data.senderRegion}</p>
      <p><strong>To:</strong> ${data.receiverRegion}</p>
      <p class="text-lg font-semibold mt-2">Total Price: ৳${price}</p>
    `,
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    customClass: {
      htmlContainer: 'text-left'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      data.deliveryCost = price; 
      data.deliveryStatus = "pending";
      data.paymentStatus = "unpaid";
      data.senderEmail = user.email;
      data.trackingId = generateTrackingId();
      data.creationDate = new Date().toISOString();
      console.log("Form Data:", data);        

      Swal.fire({
        title: 'Success!',
        text: 'Your parcel has been booked.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }
  });
};


  const inputClass =
   " w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500";

  const errorText = (msg) => (
    <p className="text-sm text-red-500 mt-1">{msg}</p>
  );






const calculatePrice = (parcelType, weight, senderRegion, receiverRegion) => {
  const sameCity = senderRegion === receiverRegion;

  if (parcelType === 'document') {
    return sameCity ? 60 : 80;
  }

  if (parcelType === 'not-document') {
    const w = parseFloat(weight);
    if (w <= 3) {
      return sameCity ? 110 : 150;
    } else {
      const extraKg = w - 3;
      const extraCharge = extraKg * 40;

      if (sameCity) {
        return 110 + extraCharge;
      } else {
        return 150 + extraCharge + 40; // extra 40 for outside district
      }
    }
  }

  return 0; // default fallback
};

  return (
    <div className="min-h-screen  flex justify-center items-center px-4 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-6xl p-6 rounded-xl shadow-md"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Add Parcel</h1>
        <p className="text-lg text-gray-600 mb-4">Fill in the details below to schedule your parcel for pickup and delivery.</p>


        {/* Parcel Type */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Parcel Type</p>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="document"
                {...register("parcelType", { required: true })}
                defaultChecked
              />
              <span>Document</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="not-document"
                {...register("parcelType", { required: true })}
              />
              <span>Not-Document</span>
            </label>
          </div>
        </div>

        {/* Parcel Name & Weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Parcel Name</label>
            <input
              type="text"
              placeholder="Parcel Name"
              {...register("parcelName", { required: "Parcel name is required" })}
              className={inputClass}
            />
            {errors.parcelName && errorText(errors.parcelName.message)}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Parcel Weight (KG)</label>
            <input
              type="number"
              placeholder="Parcel Weight"
              {...register("parcelWeight", { required: "Weight is required" })}
              className={inputClass}
            />
            {errors.parcelWeight && errorText(errors.parcelWeight.message)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-4">
          {/* Sender Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Sender Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Sender Name</label>
                <input
                 defaultValue={user?.displayName}
                  placeholder="Sender Name"
                  {...register("senderName", { required: "Sender name is required" })}
                  className={inputClass}
                  readOnly
                />
                {errors.senderName && errorText(errors.senderName.message)}
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Sender Contact</label>
                <input
                  placeholder="Sender Contact"
                  {...register("senderContact", { required: "Contact is required" })}
                  className={inputClass}
                />
                {errors.senderContact && errorText(errors.senderContact.message)}
              </div>
              
              <div className="">
  <label className="text-sm font-medium text-gray-700">Region</label>
  <select
    {...register("senderRegion", { required: "Select a region" })}
    className={inputClass}
    onChange={(e) => setSelectedSenderRegion(e.target.value)}
  >
    <option value="">Select Region</option>
    {regions.map(region => (
      <option key={region} value={region}>{region}</option>
    ))}
  </select>
  {errors.senderRegion && errorText(errors.senderRegion.message)}
</div>

<div>
  <label className="text-sm font-medium text-gray-700">Pickup Warehouse</label>
  <select
    {...register("senderWarehouse", { required: "Select a warehouse" })}
    className={inputClass}
  >
    <option value="">Select Pickup Warehouse</option>
    {getWarehouses(selectedSenderRegion).map(city => (
      <option key={city} value={city}>{city}</option>
    ))}
  </select>
  {errors.senderWarehouse && errorText(errors.senderWarehouse.message)}
</div>

              
              
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Sender Address</label>
                <input
                  placeholder="Sender Address"
                  {...register("senderAddress", { required: "Address is required" })}
                  className={inputClass}
                />
                {errors.senderAddress && errorText(errors.senderAddress.message)}
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Pickup Instruction</label>
                <textarea
                  placeholder="Pickup Instruction"
                  {...register("pickupInstruction")}
                  className={inputClass}
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Receiver Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Receiver Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Receiver Name</label>
                <input
                  placeholder="Receiver Name"
                  {...register("receiverName", { required: "Receiver name is required" })}
                  className={inputClass}
                />
                {errors.receiverName && errorText(errors.receiverName.message)}
              </div>
               <div>
                <label className="text-sm font-medium text-gray-700">Receiver Contact</label>
                <input
                  placeholder="Receiver Contact"
                  {...register("receiverContact", { required: "Contact is required" })}
                  className={inputClass}
                />
                {errors.receiverContact && errorText(errors.receiverContact.message)}
              </div>
              <div className="">
  <label className="text-sm font-medium text-gray-700">Region</label>
  <select
    {...register("receiverRegion", { required: "Select a region" })}
    className={inputClass}
    onChange={(e) => setSelectedReceiverRegion(e.target.value)}
  >
    <option value="">Select Region</option>
    {regions.map(region => (
      <option key={region} value={region}>{region}</option>
    ))}
  </select>
  {errors.receiverRegion && errorText(errors.receiverRegion.message)}
</div>

<div>
  <label className="text-sm font-medium text-gray-700">Delivery Warehouse</label>
  <select
    {...register("receiverWarehouse", { required: "Select a warehouse" })}
    className={inputClass}
  >
    <option value="">Select Delivery Warehouse</option>
    {getWarehouses(selectedReceiverRegion).map(city => (
      <option key={city} value={city}>{city}</option>
    ))}
  </select>
  {errors.receiverWarehouse && errorText(errors.receiverWarehouse.message)}
</div>

              
             
             
               <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Receiver Address</label>
                <input
                  placeholder="Receiver Address"
                  {...register("receiverAddress", { required: "Address is required" })}
                  className={inputClass}
                />
                {errors.receiverAddress && errorText(errors.receiverAddress.message)}
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Delivery Instruction</label>
                <textarea
                  placeholder="Delivery Instruction"
                  {...register("deliveryInstruction")}
                  className={inputClass}
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Info Note */}
        <p className="text-sm text-gray-500 mb-4">* Pickup time approx: 4pm–7pm</p>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-md"
        >
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
