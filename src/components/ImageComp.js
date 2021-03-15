import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage } from "gatsby-plugin-image";

const ImageComp = ({ imageComp, imageStyle }) => {
  const { alt = '', childImageSharp, image } = imageComp

  if (!!image && !!image.childImageSharp) {
    return (
      <GatsbyImage
        image={image.childImageSharp.gatsbyImageData}
        style={imageStyle}
        className="hero-background is-transparent"
        alt={alt} />
    );
  }

  if (!!childImageSharp) {
    return (
      <GatsbyImage
        image={childImageSharp.gatsbyImageData}
        style={imageStyle}
        className="hero-background is-transparent"
        alt={alt} />
    );
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
