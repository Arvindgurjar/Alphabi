"use client"
import React, { useState } from 'react'
import pp from "../../public/180309717.jpg"
import "./card.css"
import { FaStar, FaRegStar } from "react-icons/fa";
const Card = (props) => {
    const [liked, setLiked] = useState(false)
    const handleFav = () => {
        setLiked(!liked);
    }
    const getImage = () => {
        for (var img in props.image) {
            if (img === "original") {
                return props.image[img].url
            }
        }
    }
    return (
        <div className='card m-2'>
            <div >
                <img src={getImage()} alt={pp} width={354} height={236} style={{ borderRadius: "12px" }}></img>
            </div>
            <div style={{ justifyContent: "space-between", display: "flex", alignItems: "center" }} className='m-2'>
                <div>
                    <h5 className='heading'>{props.title}</h5>
                    <p className='idname ms-2'>{props.id}</p>
                </div>
                <div onClick={handleFav}>
                    {liked ? <FaStar style={{ width: "27px", height: "27px", color: "yellow" }} /> : <FaRegStar style={{ width: "27px", height: "27px" }} />}
                </div>
            </div>

        </div>
    )
}

export default Card