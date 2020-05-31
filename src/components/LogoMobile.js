import React from 'react'
import * as PropTypes from "prop-types"
import { Link } from 'gatsby'

const LogoMobile = ({ logo }) => (

  <Link to="/" title="Rifugio Kugy">
    <img src={logo} alt="Rifugio Kugy logo" id="logo"
         style={{
           position: 'relative',
           left: '1%',
           top: '0%',
           padding: '1% 1%',
           width: '120px' }} />
  </Link>
)

LogoMobile.propTypes = {
  logo: PropTypes.string,
}

export default LogoMobile;
