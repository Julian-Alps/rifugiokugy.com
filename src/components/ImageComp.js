import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const ImageComp = ({ imageComp, imageStyle }) => {
  const { alt = '', childImageSharp, image } = imageComp

  if (!!image && !!image.childImageSharp) {
    return (
      <Img style={imageStyle} className="hero-background is-transparent" fluid={image.childImageSharp.fluid} alt={alt} />
    )
  }

  if (!!childImageSharp) {
    return <Img style={imageStyle} className="hero-background is-transparent" fluid={childImageSharp.fluid} alt={alt} />
  }

  if (!!image && typeof image === 'string')
    return <img style={imageStyle} className="hero-background is-transparent" src={image} alt={alt} />

  return null
}

ImageComp.propTypes = {
  imageComp: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  }).isRequired,
  imageStyle: PropTypes.object,
}

export default ImageComp
