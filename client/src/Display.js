import React from 'react'
import Img from 'react-image'

const Display = (props) => {
  console.log('checking', props.photos);
  
  return (
    props.photos.map( photo =>
    <Img src={photo} />
    )
  )
}
export default Display;