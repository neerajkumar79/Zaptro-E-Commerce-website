import { MapPin } from 'lucide-react'
import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { FaCaretDown, FaUserCircle } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi'
import ResponsiveMenu from './ResponsiveMenu'

// Clerk temporarily disabled

const Navbar = ({ location, locationStatus, getLocation, openDropdown, setOpenDropdown, loggedIn, userEmail, onLogout }) => {
    const navigate = useNavigate()
    const { cartItem } = useCart()
    const [openNav, setOpenNav] = useState(false)

    const toggleDropdown = () => {
        setOpenDropdown(!openDropdown)
    }

    const handleLogout = () => {
        onLogout()
        navigate('/')
    }

    return (
        <div className='bg-white py-3 shadow-2xl px-4 md:px-0'>
            <div className='max-w-6xl mx-auto flex justify-between items-center'>
                {/* logo section */}
                <div className='flex gap-7 items-center'>
                    <Link to={'/'}><h1 className='font-bold text-3xl'><span className='text-red-500 font-serif'>Z</span>aptro</h1></Link>
                    <div className='md:flex gap-1 cursor-pointer text-gray-700 items-center hidden relative'>
                        <MapPin className='text-red-500' />
                        <span className='font-semibold '>
                            {location ? (
                                <div className='-space-y-2'>
                                    <p>{location.place}</p>
                                    <p>{location.region}</p>
                                </div>
                            ) : (
                                <span>Add Address</span>
                            )}
                        </span>
                        <FaCaretDown onClick={toggleDropdown} />
                        {openDropdown ? (
                            <div className='absolute left-0 top-full mt-2 w-[250px] h-max shadow-2xl z-50 bg-white border-2 p-5 border-gray-100 rounded-md'>
                                <h1 className='font-semibold mb-4 text-xl flex justify-between'>Change Location <span onClick={toggleDropdown}><CgClose/></span></h1>
                                {locationStatus ? <p className='mb-3 text-sm text-gray-500'>{locationStatus}</p> : null}
                                <button onClick={getLocation} className='bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400'>Detect my location</button>
                            </div>
                        ) : null}
                    </div>
                </div>
                {/* menu section */}
                <nav className='flex gap-7 items-center'>
                    <ul className='md:flex gap-7 items-center text-xl font-semibold hidden'>
                        <NavLink to={'/'} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500" : "text-black"} cursor-pointer`}><li>Home</li></NavLink>
                        <NavLink to={"/products"} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500" : "text-black"} cursor-pointer`}><li>Products</li></NavLink>
                        <NavLink to={"/about"} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500" : "text-black"} cursor-pointer`}><li>About</li></NavLink>
                        <NavLink to={"/contact"} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500" : "text-black"} cursor-pointer`}><li>Contact</li></NavLink>
                    </ul>
                    <Link to={'/cart'} className='relative'>
                        <IoCartOutline className='h-7 w-7' />
                        <span className='bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white'>{cartItem.length}</span>
                    </Link>
                    <div className='flex items-center gap-3'>
                        {loggedIn ? (
                            <div className='flex items-center gap-3'>
                                <div className='relative'>
                                    <FaUserCircle className='h-8 w-8 text-red-500' />
                                    <span className='absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-green-500 border border-white' />
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-sm text-gray-800'>Hi, {userEmail || 'User'}</span>
                                    <span className='text-xs text-green-600'>Logged in</span>
                                </div>
                                <button onClick={handleLogout} className='rounded-full bg-red-500 px-3 py-2 text-white transition hover:bg-red-600'>Logout</button>
                            </div>
                        ) : (
                            <Link to='/login' className='inline-flex items-center justify-center rounded-full bg-red-500 p-2 text-white hover:bg-red-600 transition'>
                                <FaUserCircle className='h-7 w-7' />
                            </Link>
                        )}
                    </div>
                    {
                        openNav ? <HiMenuAlt3 onClick={()=>setOpenNav(false)} className='h-7 w-7 md:hidden'/> : <HiMenuAlt1 
                        onClick={()=>setOpenNav(true)}
                        className='h-7 w-7 md:hidden'/>
                    }
                </nav>
            </div>
            <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav}/>
        </div>
    )
}

export default Navbar

