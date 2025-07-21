import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';



const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000', // Adjust the base URL as needed
})

const useAxiosSecure = () => {

    const {user} = useAuth();
    axiosSecure.interceptors.request.use(config =>{
    config.headers.Authorization = `Bearer ${user.accessToken}`;
    return config
  },error =>{
    return Promise.reject(error);
  })


  
   return axiosSecure;
};

export default useAxiosSecure;