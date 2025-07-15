import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { format } from 'date-fns';
import { Navigate } from 'react-router';
import { Link } from 'react-router';
import Alert from '../../shared/alert/Alert';

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['my-parcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    }
  });

  // ACTION HANDLERS
 
  // Delete Parcel
  const handleDelete = (id) => {
    console.log('Delete:', id);
    Swal.fire({
      title: 'Are you sure?',
      text: 'This parcel will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/parcels/${id}`)
          .then((res)=>{
            if (res.data.deletedCount) {
                Alert('success', 'Parcel deleted successfully');
                refetch();
            } else {
                Alert('error', 'Parcel not found or already deleted');
            }
          })
        } catch (error) {
          Alert('error', 'Failed to delete parcel', error.message);
        }
      }
    });
  };

 

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">📦 My Parcels</h2>

     <div className="overflow-x-auto">
  <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm text-sm">
    <thead className="bg-gray-100 text-gray-700 font-semibold uppercase tracking-wider text-xs">
      <tr>
        <th className="px-5 py-3 text-left">#</th>
        <th className="px-5 py-3 text-left">Parcel Name</th>
        <th className="px-5 py-3 text-left">Weight</th>
        <th className="px-5 py-3 text-left">Cost(Tk)</th>
        <th className=" px-5 py-3 text-left">Delivery Status</th>
        <th className="px-5 py-3 text-left">Payment</th>
        <th className="px-5 py-3 text-left">Created</th>
        <th className="px-5 py-3 text-left">Actions</th>
      </tr>
    </thead>
    <tbody className="text-gray-800">
      {parcels.length === 0 ? (
        <tr>
          <td colSpan="8" className="text-center py-6 text-gray-500 italic">
            No parcels found.
          </td>
        </tr>
      ) : (
        parcels.map((parcel, index) => (
          <tr key={parcel._id} className="border-t hover:bg-gray-50 transition">
            <td className="px-5 py-3">{index + 1}</td>
            <td className="px-5 py-3 font-medium">{parcel.parcelName}</td>
            <td className="px-5 py-3">{parcel.parcelWeight} kg</td>
            <td className="px-5 py-3">{parcel.deliveryCost}</td>
            <td className="px-5 py-3 capitalize">
              <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                {parcel.deliveryStatus}
              </span>
            </td>
            <td className="px-5 py-3 capitalize">
              <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                parcel.paymentStatus === 'paid'
                  ? 'bg-green-100 text-green-700 px-4'
                  : 'bg-red-100 text-red-700'
              }`}>
                {parcel.paymentStatus}
              </span>
            </td>

<td className="px-4 py-2 text-sm text-gray-600">
  {format(new Date(parcel.creationDate), 'dd MMM yyyy, hh:mm a')}
</td>

            <td className="px-5 py-3 flex flex-wrap gap-2">
  <Link to={`/dashboard/parcel-details/${parcel._id}`}>
  <button
    className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-md hover:bg-blue-200 transition"
  >
    View
  </button>
  </Link>
  
  <button
    className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-md hover:bg-red-200 transition"
    onClick={() => handleDelete(parcel._id)}
  >
    Delete
  </button>
  {parcel.paymentStatus === 'unpaid' && (
    <Link to={`/dashboard/payment/${parcel._id}`}>
     <button
      className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-md hover:bg-purple-200 transition"
    >
      Pay Now
    </button>
    </Link>
  )}
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

export default MyParcels;
