import React from 'react'
import Img from 'react-image'

const Photos = (props) => {
  console.log('checking', props.photos);
  
  return (
    <Img src={props.photos} onClick={props.onClick()} />
  )
}
export default Photos;