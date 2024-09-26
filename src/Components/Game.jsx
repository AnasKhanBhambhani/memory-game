import React, { useEffect } from 'react';
import cardImages from '../Store/imagesStore';
import coverPhoto from '/assets/question-mark.png';
import { observer } from 'mobx-react-lite';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SingleCard from './SingleCard';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();

const Game = () => {
    
    const handleStart = () => {
        cardImages.shuffleCards();
    };
    const handleGame = () => {
        cardImages.gameStart();
    }
    useEffect(() => {
        handleStart();
    }, []);
    const notify = () => toast("Game Complete & History Saved!");
    if (cardImages.gameOver) {
        notify();
        cardImages.shuffleCards();
    }
    return (
        <div className='w-[90vw] my-4 mx-auto p-3 rounded-lg container flex flex-col gap-16'>
            <div className='flex flex-wrap items-center justify-between gap-5 w-full'>
                <div className='flex max-lg:ml-auto justify-center space-x-3 ml-16'>
                    <button
                        data-aos="flip-left"
                        onClick={handleGame}
                        className='px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'>
                        {cardImages.start ? 'End Game' : 'Start Game'}
                    </button>
                   
                </div>
                <div className='flex gap-3 mr-16' data-aos="flip-right">
                    <h1 className='text-white'>Turn: {cardImages.turn}</h1>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cardImages.cards.map((imges) => (
                    <SingleCard
                        disabled={imges.disabled}
                        imges={imges}
                        coverPhoto={coverPhoto}
                        key={imges.id}
                        flipped={imges === cardImages.choiceOne || imges === cardImages.choiceTwo || imges.matched}
                    />
                ))}
            </div>
            <ToastContainer closeOnClick autoClose={1000} />
        </div>
    );
}

export default observer(Game);
