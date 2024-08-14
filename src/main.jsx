
import { createRoot } from 'react-dom/client'
import router from './Routes/Routes'
import { RouterProvider } from 'react-router-dom'
import React from 'react'


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
