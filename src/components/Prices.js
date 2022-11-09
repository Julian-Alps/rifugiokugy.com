import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Image from './PreviewCompatibleImage'
import PropTypes from 'prop-types'

const Prices = ({ prices, imageInfo }) => {
  return (
    <div className="section ">
      <a className="link is-info" href={prices} target="_blank" rel="noreferrer" id="prices">
        <Image imageInfo={imageInfo} />
      </a>
      <nav className="level py-1" id="pdf-prices">
        <div className="level-item">
          <p className="title has-text-centered">
            <FormattedMessage id="download" />
            <a className="link is-info" href={prices} target="_blank" rel="noreferrer" id="prices">
              <FormattedMessage id="rooms-prices" />
            </a>
          </p>
        </div>
      </nav>
    </div>
  )
}

Prices.propTypes = {
  prices: PropTypes.string,
  imageInfo: PropTypes.object
};

export default Prices;