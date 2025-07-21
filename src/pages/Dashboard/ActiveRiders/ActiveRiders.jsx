import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { format } from 'date-fns';

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { data: riders = [], isPending } = useQuery({
    queryKey: ['activeRiders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders?status=approved');
      return res.data;
    },
  });

  if (isPending) {
    return <p className="text-center py-10 text-lg">Loading...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">✅ Active Riders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm text-sm">
          <thead className="bg-gray-100 text-gray-700 font-semibold uppercase tracking-wider text-xs">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Region</th>
              <th className="px-4 py-3 text-left">Warehouse</th>
              <th className="px-4 py-3 text-left">Bike</th>
              <th className="px-4 py-3 text-left">License</th>
              <th className="px-4 py-3 text-left">Submitted</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {riders.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500 italic">
                  No active riders found.
                </td>
              </tr>
            ) : (
              riders.map((rider, index) => (
                <tr key={rider._id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{rider.name}</td>
                  <td className="px-4 py-3 break-all">{rider.email}</td>
                  <td className="px-4 py-3">{rider.region}</td>
                  <td className="px-4 py-3">{rider.warehouse}</td>
                  <td className="px-4 py-3">
                    {rider.bikeBrand} {rider.bikeModel}
                  </td>
                  <td className="px-4 py-3">{rider.licenseNo}</td>
                  <td className="px-4 py-3">
                    {format(new Date(rider.createdAt), 'dd MMM yyyy, hh:mm a')}
                  </td>
                  <td className="px-4 py-3 capitalize">{rider.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
