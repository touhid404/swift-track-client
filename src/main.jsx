import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/router.jsx'

import 'aos/dist/aos.css'; // You can also use <link> for styles
import AOS from 'aos';
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx'
AOS.init();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="font-urbanist">
   <AuthProvider>
     <RouterProvider router={router}></RouterProvider>
   </AuthProvider>

    </div>
  </StrictMode>,

)
