import React from 'react'
import * as PropTypes from "prop-types"
import { Link } from 'gatsby'

const Logo = ({ logo }) => (

  <Link to="/" className="navbar-item" title="Rifugio Kugy">
    <img src={logo} alt="logo Rifugio Kugy casa alpina Valbruna" id="logo"
         style={{
           //position: 'relative',
           //left: '1%',
           //top: '1%',
           //padding: '1% 1%',
           margin: '10%',
           width: '88px' }} />
  </Link>
)

Logo.propTypes = {
  logo: PropTypes.string,
}

export default Logo;
