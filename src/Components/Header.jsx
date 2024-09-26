import React, { useEffect } from 'react'
import snake from '/assets/snake.png';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useNavigate } from 'react-router-dom';
// ..

const Header = () => {
    const navigate = useNavigate();
    const gotoHistory = ( )=>{
        navigate('/history')
    }

    return (
        <header className='flex container mx-auto shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
            <div className='flex flex-wrap items-center justify-between gap-5 w-full'>
                <div className='flex gap-3' data-aos="flip-left">
                    <h1 className='text-black'>Memory game</h1>
                    <img src={snake} alt="snake" className='w-6' />
                </div>
                <div className='flex max-lg:ml-auto space-x-3'>
                    <button
                    onClick={gotoHistory}
                    data-aos="flip-right"
                        className='px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'>History</button>
                </div>
            </div>
        </header>
    )
}
export default Header
