import React from 'react'
import MainRoutes from './mainroutes/MainRoutes'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
    {/* Used toaster */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0f172a',  
            color: '#e5e7eb',
            border: '1px solid rgba(56,189,248,0.3)',
          },
        }}
      />

      <MainRoutes />
    </>
  )
}

export default App
