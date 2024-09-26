import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import cardImages from '../Store/imagesStore'
const SingleCard = ({ imges, coverPhoto, flipped,disabled }) => {
    const yourChoice = () => {
        if(!disabled ){
            cardImages.SelectedCard(imges)
        }
    }
    return (
        <div className='card'  >
            <div className={` ${flipped ? 'flipped' : ''}  flex flex-col justify-center items-center`}>
                <img src={imges.src} alt="card-front" className="w-full h-32 bg-[#362350] front object-contain " />
                <img src={coverPhoto} alt="card-back" onClick={yourChoice} className="w-full h-32 bg-[#2e233c] back object-contain" />
            </div>
        </div>
    )
}
export default observer(SingleCard)
