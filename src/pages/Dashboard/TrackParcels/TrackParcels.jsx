import React from "react";

const TrackParcels = () => {
  // Dummy data for demo
  const trackingInfo = {
    createdAt: "May 31, 2025 03:41 pm",
    id: "1487916757",
    invoice: "214227",
    trackingCode: "DJIWEXWE2798237HS45SVY7",
    name: "Zahed Hossain",
    address: "Maoshadia Road, Chandpur sadar, Chandpur, Chandpur, 3600, BD",
    phone: "01703448866",
    approval: "N/A",
    weight: "KG - 0",
    cod: "0",
    status: "Pending",
    updates: Array(6).fill("Jun 02, 2025 12:21 am")
  };

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Track Your Consignment</h2>
        <p className="text-sm text-gray-500 mb-6">
          Now you can easily track your consignment!
        </p>

        {/* Search */}
        <div className="flex mb-8">
          <input
            type="text"
            placeholder="Search tracking code here"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md"
          />
          <button className="bg-lime-400 px-5 py-2 rounded-r-md text-white font-semibold">
            Search
          </button>
        </div>


        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Details */}
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h3 className="text-lg font-semibold mb-4">Product details</h3>
            <p><strong>{trackingInfo.createdAt}</strong></p>
            <p>Id: {trackingInfo.id}</p>
            <p>Invoice: {trackingInfo.invoice}</p>
            <p>Tracking Code: <span className="font-medium text-gray-800">{trackingInfo.trackingCode}</span></p>
            <p className="mt-3">Name: {trackingInfo.name}</p>
            <p>Address: {trackingInfo.address}</p>
            <p>Phone Number: {trackingInfo.phone}</p>
            <p className="mt-3">Approval: {trackingInfo.approval}</p>
            <p>Weight: {trackingInfo.weight}</p>
            <p>COD: {trackingInfo.cod}</p>
            <p>Status: <span className="text-yellow-600 font-semibold">{trackingInfo.status}</span></p>
          </div>

          {/* Tracking Updates */}
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h3 className="text-lg font-semibold mb-4">Tracking Updates</h3>
            <div className="space-y-4">
              {trackingInfo.updates.map((date, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600 w-32">{date}</div>
                  <div className="text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-gray-700">Assigned to rider.</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackParcels;
