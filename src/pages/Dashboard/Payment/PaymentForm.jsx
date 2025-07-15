import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { parcelId } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [error, setError] = useState('');


    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })

    if (isPending) {
        return '...loading'
    }

    // console.log(parcelInfo)
    const amount = parcelInfo.deliveryCost;
    const amountInCents = amount * 100;
    console.log(amountInCents);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        // step- 1: validate the card
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })




        if (error) {
            setError(error.message);
        }
        else {
            setError('');
            console.log('payment method', paymentMethod);

            // step-2: create payment intent
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents,
                parcelId
            })

            // console.log('Res from intent',res);

            const clientSecret = res.data.clientSecret;

            // step-3: confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
            } else {
                setError('');
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment succeeded!');
                    console.log('Payment Intent:', result.paymentIntent);
                    const transactionId = result.paymentIntent.id;
                    // step-4 mark parcel paid also create payment history
                    const paymentData = {
                        parcelId,
                        email: user.email,
                        amount,
                        transactionId: transactionId,
                        paymentMethod: result.paymentIntent.payment_method_types
                    }

                    const paymentRes = await axiosSecure.post('/payments', paymentData);
                    if (paymentRes.data.insertedId) {

                        // ✅ Show SweetAlert with transaction ID
                        await Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                            confirmButtonText: 'Go to My Parcels',
                        });

                        // ✅ Redirect to /myParcels
                        navigate('/dashboard/my-parcels');

                    }
                }
            }
        }





    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Secure Payment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
            <CardElement />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={!stripe}
            className="w-full bg-lime-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 disabled:opacity-60"
          >
            Pay ${amount}
          </button>
        </form>
      </div>
    </div>
  
    );
};

export default PaymentForm;