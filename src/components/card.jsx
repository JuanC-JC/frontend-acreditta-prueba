import React from 'react';

import '../styles/card.scss'

export default function Card ({data}) {


  // console.log(data.img.url)
    return (
    <div className='card'>
      <img src={data.image.url} alt="" />
      <div className="card__info">
        <div className='card__name'>{data.name}</div>
        <div className='card__status'>{data.biography.alignment}</div>
      </div>
    </div>
);
};