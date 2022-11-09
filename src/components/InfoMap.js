import React, { Component } from 'react'
import ImageComp from './ImageComp'
import * as PropTypes from 'prop-types'

export default class InfoMap extends Component {
  render() {
    const props = this.props;
    const message = props.message;
    const link = props.link;
    const imageComp = props.infoMap
    const imageStyle = props.imageStyle
    return(
      <div className='content' >
      <a href={link}>
      <h3 className="has-text-weight-bold has-text-centered is-size-1-desktop is-size-6-mobile infomap-slogan"
        style={{
          boxShadow: '0.2rem 0 0 #738173, -0.2rem 0 0 #738173',
          backgroundColor: '#738173',
          color: 'white',
          padding: '0.75rem',
          position: 'relative',
          zIndex: '20'
        }}>{message}</h3>
        </a>
        <ImageComp imageComp={imageComp} imageStyle={imageStyle}/>
      </div>
    )
  }
}

InfoMap.propTypes = {
  link: PropTypes.string,
  imageComp: PropTypes.object,
  imageStyle: PropTypes.string,
  infoMap: PropTypes.object,
  message: PropTypes.string
}
