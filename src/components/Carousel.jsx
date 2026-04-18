import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Category from './Category';

const Carousel = () => {
    const { data } = useData()
    const navigate = useNavigate()
    const sliderRef = useRef(null)

    const Arrow = ({ direction, onClick }) => {
        return (
            <div
                onClick={onClick}
                className={`absolute top-1/2 z-10 cursor-pointer ${
                    direction === "left" ? "left-4" : "right-4"
                }`}
            >
                {direction === "left" ? (
                    <AiOutlineArrowLeft className="text-white bg-red-500 p-2 rounded-full text-2xl hover:scale-110 transition-transform" />
                ) : (
                    <AiOutlineArrowRight className="text-white bg-red-500 p-2 rounded-full text-2xl hover:scale-110 transition-transform" />
                )}
            </div>
        )
    }

    const settings = {
        dots: false,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        pauseOnFocus: true,
        accessibility: false,
        focusOnSelect: false,
        beforeChange: () => {
            const active = document.activeElement
            if (sliderRef.current?.contains(active)) {
                active.blur()
            }
        },
        arrows: true,
        nextArrow: <Arrow direction="right" />,
        prevArrow: <Arrow direction="left" />,
    }

    // Removed: unstable innerSlider hack that caused warnings

    return (
        <div ref={sliderRef} className="relative">
            <Slider {...settings}>
                {data && data.length > 0 ? (
                    data.slice(0, 7).map((item) => (
                        <div key={item.id} className='bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]'>
                            <div className="flex flex-col md:flex-row gap-10 justify-center h-[600px] items-center px-4">
                                <div className="md:space-y-6 space-y-3">
                                    <h3 className="text-red-500 font-semibold text-sm">
                                        Powering Your World with the Best in Electronics
                                    </h3>
                                    <h1 className="md:text-4xl text-xl font-bold uppercase line-clamp-2 md:line-clamp-3 md:w-[500px] text-white">
                                        {item.title}
                                    </h1>
                                    <p className="md:w-[500px] line-clamp-3 text-gray-400 pr-7">
                                        {item.description}
                                    </p>
                                    <button onClick={() => navigate('/products')} className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-4 py-2 rounded-md cursor-pointer mt-2 hover:scale-105 transition">
                                        Shop Now
                                    </button>
                                </div>
                                <div>
                                    <img
                                        src={item.images[0]}
                                        alt={item.title}
                                        className="w-[400px] object-contain hover:scale-105 transition-all duration-300 drop-shadow-[0_0_20px_rgba(255,0,0,0.5)]"
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="h-[600px] flex items-center justify-center bg-black">
                        <p className="text-white text-lg">Loading...</p>
                    </div>
                )}
            </Slider>
            <Category />
        </div>
    )
}

export default Carousel

