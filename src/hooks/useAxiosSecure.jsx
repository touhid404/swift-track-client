import axios from 'axios';
import React from 'react';



const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000', // Adjust the base URL as needed
})

const useAxiosSecure = () => {
   return axiosSecure;
};

export default useAxiosSecure;