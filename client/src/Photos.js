import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faImages,  faFolderOpen } from '@fortawesome/free-solid-svg-icons'


export default props => 
  <div className='buttons fadein'>
    <div className='button'>
      <label htmlFor='single'>
        <FontAwesomeIcon icon={faFolderOpen} color='#3B5998' size='10x' />
      </label>
      <input type='file' id='single' onClick={props.onClick} />
    </div>
  </div>