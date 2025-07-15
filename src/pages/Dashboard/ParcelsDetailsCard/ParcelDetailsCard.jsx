import React from 'react';
import { useLoaderData } from 'react-router';

const ParcelDetailsCard = () => {
  const parcel = useLoaderData();

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl border border-gray-300 p-10">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Parcel Details
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            Tracking ID: <span className="font-mono text-indigo-600">{parcel.trackingId}</span>
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-700 text-base leading-relaxed">
          {/* Basic Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2 text-gray-900">
              📦 Basic Information
            </h2>
            <ul className="space-y-3">
              <li><strong>Parcel Type:</strong> {parcel.parcelType}</li>
              <li><strong>Parcel Name:</strong> {parcel.parcelName}</li>
              <li><strong>Weight:</strong> {parcel.parcelWeight} kg</li>
              <li><strong>Delivery Cost:</strong> ৳{parcel.deliveryCost}</li>
              <li><strong>Status:</strong> <span className="capitalize">{parcel.deliveryStatus}</span></li>
              <li><strong>Payment:</strong> <span className="capitalize">{parcel.paymentStatus}</span></li>
              <li><strong>Created At:</strong> {new Date(parcel.creationDate).toLocaleString()}</li>
            </ul>
          </div>

          {/* Sender Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2 text-gray-900">
              🧍 Sender Information
            </h2>
            <ul className="space-y-3">
              <li><strong>Name:</strong> {parcel.senderName}</li>
              <li><strong>Email:</strong> {parcel.senderEmail}</li>
              <li><strong>Contact:</strong> {parcel.senderContact}</li>
              <li><strong>Region:</strong> {parcel.senderRegion}</li>
              <li><strong>Warehouse:</strong> {parcel.senderWarehouse}</li>
              <li><strong>Address:</strong> {parcel.senderAddress}</li>
              <li><strong>Pickup Instruction:</strong> {parcel.pickupInstruction || 'N/A'}</li>
            </ul>
          </div>

          {/* Receiver Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2 text-gray-900">
              📍 Receiver Information
            </h2>
            <ul className="space-y-3">
              <li><strong>Name:</strong> {parcel.receiverName}</li>
              <li><strong>Contact:</strong> {parcel.receiverContact}</li>
              <li><strong>Region:</strong> {parcel.receiverRegion}</li>
              <li><strong>Warehouse:</strong> {parcel.receiverWarehouse}</li>
              <li><strong>Address:</strong> {parcel.receiverAddress}</li>
              <li><strong>Delivery Instruction:</strong> {parcel.deliveryInstruction || 'N/A'}</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ParcelDetailsCard;
