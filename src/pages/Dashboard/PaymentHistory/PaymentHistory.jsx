import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { format } from 'date-fns';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isPending } = useQuery({
    queryKey: ['paymentHistory', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    }
  });

  if (isPending) {
    return <p className="text-center py-10 text-lg">Loading...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">💳 Payment History</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm text-sm">
          <thead className="bg-gray-100 text-gray-700 font-semibold uppercase tracking-wider text-xs">
            <tr>
              <th className="px-5 py-3 text-left">#</th>
              <th className="px-5 py-3 text-left">Parcel ID</th>
              <th className="px-5 py-3 text-left">Transaction ID</th>
              <th className="px-5 py-3 text-left">Amount (Tk)</th>
              <th className="px-5 py-3 text-left">Method</th>
              <th className="px-5 py-3 text-left">Paid At</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {payments.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500 italic">
                  No payment records found.
                </td>
              </tr>
            ) : (
              payments.map((payment, index) => (
                <tr key={payment._id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-5 py-3">{index + 1}</td>
                  <td className="px-5 py-3">{payment.parcelId}</td>
                  <td className="px-5 py-3 break-all">{payment.transactionId}</td>
                  <td className="px-5 py-3">{payment.amount}</td>
                  <td className="px-5 py-3 capitalize">
                    <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                      {payment.paymentMethod?.[0]}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {format(new Date(payment.paid_at), 'dd MMM yyyy, hh:mm a')}
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

export default PaymentHistory;
