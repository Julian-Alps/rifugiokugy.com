import React from 'react'
import Image from '../../components/PreviewCompatibleImage'
import Title from './Title'
import * as PropTypes from 'prop-types'

class RightCard extends React.Component {

  render () {
    const props = this.props
    const imageInfo = props.rightCard.imageInfo
    const title = props.rightCard.title
    const text = props.rightCard.text
    const frameColor = props.frameColor
    const interiorColor = props.interiorColor
    const interiorFrameColor = props.interiorFrameColor

    return(

     <div id={props.idlink} className='columns is-vcentered ' style={{ backgroundColor: frameColor }}>
       <div className='column'>
        <Image imageInfo={imageInfo}/>
       </div>
       <div className='column'>
         <div className={'section ' + interiorColor + ' interior-card'} style={{ backgroundColor: interiorFrameColor }}>
           <Title title={title} />
           <p>{text}</p>
         </div>
      </div>
     </div>

    )
  }
}

RightCard.propTypes = {
idlink: PropTypes.string,
rightCard: PropTypes.object,
frameColor: PropTypes.string,
interiorColor: PropTypes.string,
interiorFrameColor: PropTypes.string
}

export default RightCard
