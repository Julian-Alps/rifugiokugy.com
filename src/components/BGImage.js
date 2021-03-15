import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage } from "gatsby-plugin-image";

const BGImage = ({ bgImage }) => {
  const imageStyle = {   position: 'absolute',
                         backgroundAttachment: `fixed`,
                         objectPosition: 'center center',
                         width: '100%' }
  const { alt = '', childImageSharp, image } = bgImage

  if (!!image && !!image.childImageSharp) {
    return (
      <GatsbyImage
        image={image.childImageSharp.gatsbyImageData}
        style={imageStyle}
        className="hero-background is-transparent"
        alt={alt} />
    );
  }

  if (childImageSharp) {
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

BGImage.propTypes = {
  bgImage: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object,
  }).isRequired,
}

export default BGImage
