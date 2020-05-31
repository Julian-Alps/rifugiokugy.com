import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const BGImage = ({ bgImage }) => {
  const imageStyle = {   position: 'absolute',
                         backgroundAttachment: `fixed`,
                         objectPosition: 'center center',
                         width: '100%' }
  const { alt = '', childImageSharp, image } = bgImage

  if (!!image && !!image.childImageSharp) {
    return (
      <Img style={imageStyle} className="hero-background is-transparent" fluid={image.childImageSharp.fluid} alt={alt} />
    )
  }

  if (childImageSharp) {
    return <Img style={imageStyle} className="hero-background is-transparent" fluid={childImageSharp.fluid} alt={alt} />
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
