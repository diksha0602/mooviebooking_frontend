import React from 'react'
import './CelebCards.css'
const CelebCard = (data) => {
  return (
    <div className='celebcard'>
        <img src={data.imageUrl} alt={data.name} width={200} height={200}/>
        <h3>{data.name}</h3>
        <h4>{data.role}</h4>
    </div>
  )
}

export default CelebCard