import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import Alert from '../../shared/alert/Alert';

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch pending riders
  const { data: riders = [], refetch, isPending } = useQuery({
    queryKey: ['pendingRiders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders?status=pendingOrRejected');
      return res.data;
    },
  });

  // Handle status update with confirmation
  const updateRiderStatus = (id,email, status) => {
    const actionText = status === 'approved' ? 'approve' : 'reject';
    const confirmText = status === 'approved' ? 'Yes, approve!' : 'Yes, reject it!';
    const successMessage = status === 'approved' ? 'Rider approved successfully' : 'Rider rejected successfully';
    const failureMessage = status === 'approved' ? 'Failed to approve rider' : 'Failed to reject rider';

    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to ${actionText} this request.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/riders/${id}`, { status ,email })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Alert('success', successMessage);
              refetch();
            } else {
              Alert('error', failureMessage);
            }
          })
          .catch((error) => {
            Alert('error', error.message);
          });
      }
    });
  };

  if (isPending) {
    return <p className="text-center py-10 text-lg">Loading...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">🕒 Pending Rider Requests</h2>

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
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {riders.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-500 italic">
                  No pending requests.
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
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => updateRiderStatus(rider._id, rider.email,'approved')}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateRiderStatus(rider._id,rider.email ,'rejected')}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingRiders;
