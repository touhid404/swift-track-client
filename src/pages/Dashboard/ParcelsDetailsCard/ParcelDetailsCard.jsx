import React from 'react';
import { useLoaderData } from 'react-router';

const ParcelDetailsCard = () => {

    const parcel = useLoaderData();
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-200 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📦 Parcel Details</h2>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div>
          <p><span className="font-semibold text-gray-600">Tracking ID:</span> {parcel.trackingId}</p>
          <p><span className="font-semibold text-gray-600">Parcel Type:</span> {parcel.parcelType}</p>
          <p><span className="font-semibold text-gray-600">Parcel Name:</span> {parcel.parcelName}</p>
          <p><span className="font-semibold text-gray-600">Weight:</span> {parcel.parcelWeight} kg</p>
          <p><span className="font-semibold text-gray-600">Delivery Cost:</span> ৳{parcel.deliveryCost}</p>
          <p><span className="font-semibold text-gray-600">Status:</span> <span className="capitalize">{parcel.deliveryStatus}</span></p>
          <p><span className="font-semibold text-gray-600">Payment:</span> <span className="capitalize">{parcel.paymentStatus}</span></p>
          <p><span className="font-semibold text-gray-600">Created:</span> {new Date(parcel.creationDate).toLocaleString()}</p>
        </div>

        {/* Sender */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-1">🧍 Sender Info</h3>
          <p><span className="font-semibold">Name:</span> {parcel.senderName}</p>
          <p><span className="font-semibold">Email:</span> {parcel.senderEmail}</p>
          <p><span className="font-semibold">Contact:</span> {parcel.senderContact}</p>
          <p><span className="font-semibold">Region:</span> {parcel.senderRegion}</p>
          <p><span className="font-semibold">Warehouse:</span> {parcel.senderWarehouse}</p>
          <p><span className="font-semibold">Address:</span> {parcel.senderAddress}</p>
          <p><span className="font-semibold">Instruction:</span> {parcel.pickupInstruction || 'N/A'}</p>
        </div>

        {/* Receiver */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-1">📍 Receiver Info</h3>
          <p><span className="font-semibold">Name:</span> {parcel.receiverName}</p>
          <p><span className="font-semibold">Contact:</span> {parcel.receiverContact}</p>
          <p><span className="font-semibold">Region:</span> {parcel.receiverRegion}</p>
          <p><span className="font-semibold">Warehouse:</span> {parcel.receiverWarehouse}</p>
          <p><span className="font-semibold">Address:</span> {parcel.receiverAddress}</p>
          <p><span className="font-semibold">Instruction:</span> {parcel.deliveryInstruction || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default ParcelDetailsCard;
