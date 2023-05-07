import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Image from './PreviewCompatibleImage'
//import Emoji from "react-emoji-render";
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'

const Bikes = ({ infos, link, imageInfo }) => {
  return (
    <div className="section ">
     <ReactMarkdown>{infos}</ReactMarkdown>
      <a className="link is-info" href={link} target="_blank" rel="noreferrer" id="prices">
        <Image imageInfo={imageInfo} />
      </a>
      <nav className="level py-1" id="pdf-prices">
        <div className="level-item">
          <p className="title has-text-centered">
            <FormattedMessage id="download" />
            <a className="link is-info" href={link} target="_blank" rel="noreferrer" id="prices">
              <FormattedMessage id="bikes-info" />
            </a>
          </p>
        </div>
      </nav>
    </div>
  )
}

Bikes.propTypes = {
  infos: PropTypes.string,
  link: PropTypes.string,
  imageInfo: PropTypes.object
};

export default Bikes;