import React from 'react'
import {FormattedMessage} from 'react-intl'
import PropTypes from 'prop-types'

const Prices = ({prices}) => {
  return (
    <div className="section">
      <nav className="level">
        <div className="level-item">
          <p className="title has-text-centered">
            <FormattedMessage id="download"/>
            <a className="link is-info" href={prices} target="_blank" rel="noreferrer" id="prices">       
              <FormattedMessage id="rooms-prices"/>
            </a>
          </p>
        </div>
      </nav>
    </div>
  )
}

Prices.propTypes = {
  prices: PropTypes.string,
};

export default Prices;