import React from 'react'
import PropTypes from 'prop-types'
import ImageComp from '../components/ImageComp'

const SlideImage = ({ imageComp, classStyle, imgStyle }) => {

<section className={classStyle}>
    <div>
      <ImageComp imageComp={imageComp} imageStyle={imgStyle}/>
    </div>
</section>

}

SlideImage.propTypes = {
  imageComp: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  }).isRequired,
  classStyle: PropTypes.object,
  imgStyle: PropTypes.object,
}


export default SlideImage
