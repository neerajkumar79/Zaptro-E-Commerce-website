import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import axios from 'axios'
import Footer from './components/Footer'
import SingleProduct from './pages/SingleProduct'
import CategoryProduct from './pages/CategoryProduct'
import Login from './pages/Login'
import { useCart } from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'


const App = () => {
  const [location, setLocation] = useState(null)
  const [locationStatus, setLocationStatus] = useState('')
  const [openDropdown, setOpenDropdown] = useState(false)
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true')
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('userEmail') || '')
  const { cartItem, setCartItem } = useCart()

  const getLocation = async () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation not supported')
      return
    }

    const parseAddress = (address = {}) => {
      const city = address.city || address.town || address.village || address.county || address.state_district || address.state
      const region = address.state || address.region || address.country || ''
      return {
        city,
        region,
        county: address.county,
        state: address.state,
        place: city || address.display_name || ''
      }
    }

    navigator.geolocation.getCurrentPosition(
      async pos => {
        const { latitude, longitude } = pos.coords
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        try {
          const response = await axios.get(url)
          const exactLocation = parseAddress(response.data.address)
          setLocation(exactLocation)
          setLocationStatus('Location detected')
          setOpenDropdown(false)
        } catch {
          setLocationStatus('Unable to detect location')
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setLocationStatus('Location permission denied')
        } else {
          setLocationStatus('Unable to detect location')
        }
      }
    )
  }

  useEffect(() => {
    getLocation()
  }, [])

  //Load cart from local storage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItem')
    if (storedCart) {
      setCartItem(JSON.parse(storedCart))
    }
  }, [setCartItem]);

  //save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItem', JSON.stringify(cartItem))
  }, [cartItem])

  const handleLogin = (email) => {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userEmail', email)
    setLoggedIn(true)
    setUserEmail(email)
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    setLoggedIn(false)
    setUserEmail('')
  }

  return (
    <BrowserRouter>
      <Navbar
        location={location}
        locationStatus={locationStatus}
        getLocation={getLocation}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        loggedIn={loggedIn}
        userEmail={userEmail}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/products/:id' element={<SingleProduct />}></Route>
        <Route path='/category/:category' element={<CategoryProduct />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/login' element={<Login onLogin={handleLogin} />}></Route>
        <Route path='/cart' element={<ProtectedRoute>
          <Cart location={location} getLocation={getLocation} />
        </ProtectedRoute>}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
