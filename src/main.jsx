import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProvider } from './context/DataContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ToastContainer } from 'react-toastify'
import ScrollToTop from 'react-scroll-to-top'

// TODO: Add your real Clerk key to .env to re-enable
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <DataProvider>
    <CartProvider>
      {/* Clerk temporarily disabled - add key to .env and uncomment */}
      {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/> */}
        <App />
        <ScrollToTop color='white' smooth style={{backgroundColor:'#fa2d37', display:'flex', alignItems:'center', justifyContent:'center'}}/>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      {/* </ClerkProvider> */}
    </CartProvider>
  </DataProvider>
  // </StrictMode>,
)

