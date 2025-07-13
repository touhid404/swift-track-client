import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/router.jsx'
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx'


import 'aos/dist/aos.css'; // You can also use <link> for styles
import AOS from 'aos';

const queryClient = new QueryClient()
AOS.init();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="font-urbanist">


      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
  

    </div>
  </StrictMode>,

)
