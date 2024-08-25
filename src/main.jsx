import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './Routes/Routes';
import AuthProvider from './providers/AuthProvider';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
       <AuthProvider>
       <QueryClientProvider client={queryClient}>
       <div className='max-w-screen-lg mx-auto'>
        <RouterProvider router={router} />
        </div>
    </QueryClientProvider>
      
       </AuthProvider>
  </React.StrictMode>,
)
