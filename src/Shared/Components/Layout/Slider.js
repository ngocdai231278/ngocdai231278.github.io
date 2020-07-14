import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CLICK_DOT, NEXT_SLIDE, PREVIOUS_SLIDE } from '../../../Redux-setup/Action-type'

function Slider() {
    const dispatch = useDispatch()

    const image = useSelector((state) => state.img)

    const clickDot = () => {
        dispatch({
            type: CLICK_DOT
        })
    }

    return (
        <>
            {/* !--Slider	-- */}
            <div id="slide" className="carousel slide" data-ride="carousel">
                {/* Indicators */}
                <ul className="carousel-indicators">
                    <li onClick={clickDot} className="active" />
                    <li onClick={clickDot} />
                    <li onClick={clickDot} />
                    <li onClick={clickDot} />
                    <li onClick={clickDot} />
                    <li onClick={clickDot} />
                </ul>
                {/* The slideshow */}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="images/slide-1.png" alt="Vietpro Academy" />
                    </div>
                    <div className="carousel-item">
                        <img src="images/slide-2.png" alt="Vietpro Academy" />
                    </div>
                    <div className="carousel-item">
                        <img src="images/slide-3.png" alt="Vietpro Academy" />
                    </div>
                    <div className="carousel-item">
                        <img src="images/slide-4.png" alt="Vietpro Academy" />
                    </div>
                    <div className="carousel-item">
                        <img src="images/slide-5.png" alt="Vietpro Academy" />
                    </div>
                    <div className="carousel-item">
                        <img src="images/slide-6.png" alt="Vietpro Academy" />
                    </div>
                </div>
                {/* Left and right controls */}
                <a className="carousel-control-prev" href="#slide" data-slide="prev">
                    <span className="carousel-control-prev-icon" />
                </a>
                <a className="carousel-control-next" href="#slide" data-slide="next">
                    <span className="carousel-control-next-icon" />
                </a>
            </div>
            {/*	End Slider	*/}
        </>
    )
}

export default Slider
