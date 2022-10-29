import React from 'react'
import {FormattedMessage} from 'react-intl'
import PropTypes from 'prop-types'

const MenuPDF = ({menu}) => {
  return (
    <div className="section">
      <nav className="level">
        <div className="level-item">
          <p className="title has-text-centered">
            <FormattedMessage id="download_menu"/>
            <a className="link is-info" href={menu} target="_blank" rel="noreferrer" id="menuPDF">       
              menu
            </a>
          </p>
        </div>
      </nav>
    </div>
  )
}

MenuPDF.propTypes = {
  menu: PropTypes.string,
};

export default MenuPDF;